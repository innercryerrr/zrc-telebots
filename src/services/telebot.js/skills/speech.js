module.exports = {
    
    instruct: async function (ttchat) {
        
        clog('  ...running this.$instruct()\n')
        
        await this.sendonce(ttchat.id, [
            '/chk - add novas infos para check.',
            '/chks - listar suas infos testadas.',
            '/chking - listar suas infos na fila de chk.',
            '/clear - todas suas infos testadas.',
            '/saldo - consultar saldo.',
            '/recarga - recarregar saldo.',
            '/sobre - entender como funciona.',
            '/ajuda - ser atendido por um adm.',
            '/tutvid - assistir o tutorial de uso em vídeo.'
        ])
    },

    askinfostextlist: async function (ttchat) {
        
        clog('  ...running this.$askinfostextlist()\n')

        await this.sendonce(ttchat.id, [
            '\n Envie no padrão 999999999999|09|09|999\n',
            '→ Deve estar separada por quebra de linhas, sem espaços.',
            '→ Digite /ex para mostrar exemplo.'
        ])
    },

    askchargeamount: async function (ttchat) {
        
        clog('  ...running this.$askchargeamount()\n')

        await this.sendonce(ttchat.id, [
            'Quanto vai recarregar?\n',
            '→ Escolha uma das opções de recarga.',
            '→ Ofertas de bônus por tempo limitado!',
            '→ 97% de precisão garantido.\n',
            'Custo por chk: 1 zchkoin ou R$ 00.10'
        ])
        
        await this.sendonce(ttchat.id, [
            `/100  -  R$ 10,00  +1 bônus`, 
            `/200  -  R$ 20,00  +6 bônus`, 
            `/300  -  R$ 30,00  +15 bônus`, 
            `/400  -  R$ 40,00  +20 bônus`,
            `/500  -  R$ 50,00  +25 bônus`,
            `/600  -  R$ 60,00  +35 bônus`, 
            `/700  -  R$ 70,00  +40 bônus`, 
            `/800  -  R$ 80,00  +50 bônus`, 
            `/900  -  R$ 90,00  +60 bônus`,
            `/1000 -  R$ 100,00  +90 bônus`, 
            `/1250 -  R$ 125,00  +105 bônus`, 
            `/1500 -  R$ 150,00  +115 bônus`,
            `/3000 -  R$ 300,00  +190 bônus`, 
            `/5000 -  R$ 500,00  +390 bônus`, 
            `/9999 -  R$ 999,90  +850 bônus`
        ])

        await this.sendone(ttchat.id, '→ Exemplo: /100 = 100 zchkoin + bonus.')
    },

    askconfirmpurchase: async function (ttchat) {
        
        clog('  ...running this.$askconfirmpurchase()\n')
       
        await this.sendonce(ttchat.id, [
            `Total p/ ${ this.get(ttchat.id, 'OrderAmount') } checks:`
             + ` R$ ${ this.get(ttchat.id, 'OrderTotal').toFixed(2) } \n`,
                '→ Digite /ok para confirmar a compra!'
        ])
    },

    speechAbout: async function (ttchat) {
        
        await this.sendonce(ttchat.id, [
            '→ Por que o checker mais efieciente? \n',
            '1) Nossos servidores herdam de outros que usam seus gateways licitamente.',
            '2) As request são rotacionadas com dados de conexão gerados proxy móvel.',
            '3) Nosso proxy é dedicado e rotaciona infinitos IP`s NAT por request.',
            '4) A request é acionada por um WebDriver que simula interação humana.',
            '5) As interações humanas são orquestradas com fingerprints e delays aleatórios.',
            '6) Detecta e barra infos inválidas e geradas.',
            '7) Cada servidor conta com uma conta de gateway verificadas nas respecticas empresas.'
        ]); 
        
        await this.sendonce(ttchat.id, [
            '→ Isso garante 97% de assertividade nos Check Lives!',
            '→ Como? Evitando o disperdício de checks por recusas de suspeita de Botnet.'
        ]); 

        return;
    },

    onwrong: async function (ttchat, _textortextarr, _exceedfunc, _isinit) {

        clog('  ...running this.$onwrong()\n')
        
        this.inc(ttchat.id, 'WrongReplyCount', 1)
        
        if (this.get(ttchat.id, 'WrongReplyCount') > 3) {
            
            if (!_isinit) {
                await this.sendone(ttchat.id, 'Para voltar ao início, digite /init')
            } else {
                await _exceedfunc() // again...
                this.set(ttchat.id, 'WrongReplyCount', 0) // zera...
            }
            
        } else {
            if (Array.isArray(_textortextarr)) {
                await this.sendany(ttchat.id, _textortextarr)
            } else {
                await this.sendone(ttchat.id, _textortextarr)
            }
        }
    }
}