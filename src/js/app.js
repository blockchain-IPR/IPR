App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load pets.
        $.getJSON('../pets.json', function (data) {
            const petsRow = $('#petsRow')
            const petTemplate = $('#petTemplate')

            for (i = 0; i < data.length; i++) {
                petTemplate.find('.panel-title').text(data[i].name)
                petTemplate.find('img').attr('src', data[i].picture)
                petTemplate.find('.pet-breed').text(data[i].breed)
                petTemplate.find('.pet-age').text(data[i].age)
                petTemplate.find('.pet-location').text(data[i].location)
                petTemplate.find('.btn-adopt').attr('data-id', data[i].id)

                petsRow.append(petTemplate.html())
            }
        })
        $('nav').load('nav.html')
        return App.initWeb3()
    },

    initWeb3: function () {
// Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
        } else {
// If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
        }
        web3 = new Web3(App.web3Provider)
        return App.initContract()
    },

    initContract: function () {
// 加载Adoption.json，保存了Adoption的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
        $.getJSON('IPR.json', function (IPRArtifact) {
// new合约太贵
//             App.contracts.Project = web3.eth.contract(ProjectArtifact.abi)
            App.contracts.IPR = TruffleContract(IPRArtifact)
// Set the provider for our contract
            App.contracts.IPR.setProvider(App.web3Provider)
// Use our contract to retrieve and mark the adopted pets
            return App.getProjects()
        })
        return App.bindEvents()
    },

    bindEvents: function () {
        $(document).on('click', '.btn-adopt', App.handleBranch)
        $('#project').submit(App.save)
    },

    getProjects: function (adopters, account) {
        console.log('GetProject is not implement. TODO')//TODO
//         let adoptionInstance
//         App.contracts.Adoption.deployed().then(function (instance) {
//             adoptionInstance = instance
// // 调用合约的getAdopters(), 用call读取信息不用消耗gas
//             return adoptionInstance.getAdopters.call()
//         }).then(function (adopters) {
//             for (let i = 0; i < adopters.length; i++) {
//                 if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
//                     $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true)
//                 }
//             }
//         }).catch(function (err) {
//             console.log(err.message)
//         })
//
    },

    handleBranch: function (event) {
        event.preventDefault()

        const id = parseInt($(event.target).data('id'))
        location.href = `/edit.html?parent=${id}`
// 获取用户账号
//         web3.eth.getAccounts(function (error, accounts) {
//             if (error) {
//                 console.log(error)
//             }
//             const account = accounts[0]// 用第一个账号领养
        // })
    },
    save: function (e) {
        e.preventDefault()
        const form = $('#project')
        const searchParams = new URLSearchParams(window.location.search)
        const project = {
            name: form.find('#name').val(),
            desc: form.find('#desc').val(),
            parentId: searchParams.get('parent')
        }
        App.contracts.IPR.deployed().then(function (instance) {
            return instance.saveProject(project)
        }).then(function (result) {
            return App.getProjects()
        }).catch(function (err) {
            console.error(err)
        })
    }

}

$(function () {
    $(window).load(function () {
        App.init()
    })
})
