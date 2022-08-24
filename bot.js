const { Client } = require('discord.js');
const { token } = require('./config.json')
const { webkit } = require('playwright')
const client = new Client({ intents: [131071] });

client.once('ready', () => {
	console.log('Pronto! Estou online');
});

client.on('interactionCreate', async (interacao) => {
    
	if(!interacao.isCommand()) return
	interacao.deferReply()

	//Passo a passo para o funcionamento do comando

	//1 - Receber o Texto do usuário
	const textoDoUsuário = interacao.options.get('texto').value

	//2 - Abrir o navegador e uma nova aba
	const navegador = await webkit.launch()
	const pagina = await navegador.newPage()

	//3 - Ir até o site
	await pagina.goto('https://www.unitpedia.com/font-generator/')

	//4 - Inserir no site o texto recebido do usuário
	const areaDeTexto = await pagina.fill('#gatsby-focus-wrapper > div:nth-child(3) > section > textarea', textoDoUsuário)

	//5 - Escolher aleatóriamente um dos resultados retornados pelo site
	const caixaComBarraDeScroll = await pagina.$('#gatsby-focus-wrapper > div:nth-child(3) > section > div > div')
	await pagina.evaluate((caixaComBarraDeScroll) => {

		const numeroEntre0e9000 = Math.floor(Math.random() * 9000)
		caixaComBarraDeScroll.scroll(0, numeroEntre0e9000)

	}, caixaComBarraDeScroll)

	const caixaComTextos = await pagina.$('#gatsby-focus-wrapper > div:nth-child(3) > section > div > div > div')
	const textoComFonteAleatoria = await pagina.evaluate((caixaComTextos) => {
		
		const numeroEntre0E14 = Math.floor(Math.random() * 14)
		const caixaAleatoria = caixaComTextos.childNodes[numeroEntre0E14]
		const fonteAleatoria = caixaAleatoria.firstChild.value

		return fonteAleatoria
	}, caixaComTextos)

	//6 - Enviar o texto selecionado aleatóriamente devolta para o discord, respondendo o comando do usuário
	await interacao.editReply(textoComFonteAleatoria)

	await pagina.waitForTimeout(7000)
	await navegador.close()
})

client.login(token);