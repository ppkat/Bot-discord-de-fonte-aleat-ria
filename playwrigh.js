//Explicação rápida sobre o funcionamento do playwright

const { webkit } = require('playwright');

(async () => {

    //Abrir o navegador no modo com janela vísivel
    const browser = await webkit.launch({headless: false});

    // Abrir uma aba no navegador
    const page = await browser.newPage();

    //Mandar a aba acessar ao site
    await page.goto('http://whatsmyuseragent.org/');

    //Tirar uma print do que está aparecendo na tela e salvar com o nome "example.png"
    await page.screenshot({ path: `example.png` });

    //esperar 3 segundos para que possamos ver o que está acontecendo
    await page.waitForTimeout(3000)

    //Fechar o navegador para finalizar o script
    await browser.close();
})();