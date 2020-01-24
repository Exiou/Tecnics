const parseStringAsArray = require('../../utils/parseStringAsArray')

exports.queryProcessador = (buscar,precoMin,precoMax,nucleoMin,nucleoMax,freqMin,freqMax,consumoMin,consumoMax,cooler,multithreading,ecc,virtualizacao,fabricante,serie,familia,socket,graficos) => {
    query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { preco: { $gte: precoMin }},
            { preco: { $lte: precoMax }},
            { nucleo: { $gte: nucleoMin }},
            { nucleo: { $lte: nucleoMax }},
            { frequencia: { $gte: freqMin }},
            { frequencia: { $lte: freqMax }},
            { consumo: { $gte: consumoMin }},
            { consumo: { $lte: consumoMax }},
            { cooler_incluso: { $in: parseStringAsArray(cooler) }},
            { multithreading: { $in: parseStringAsArray(multithreading) }},
            { suporte_ecc: { $in: parseStringAsArray(ecc) }},
            { virtualizacao: { $in: parseStringAsArray(virtualizacao) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { serie: { $in: parseStringAsArray(serie) }},
            { familia: { $in: parseStringAsArray(familia) }},
            { socket: { $in: parseStringAsArray(socket) }},
            { graficos_integrados: { $in: parseStringAsArray(graficos) }},
        ]
    }

    return query
}

exports.queryPlacaVideo = (precoMin,precoMax,memoriaMin,memoriaMax,clockMin,clockMax,comprimentoMin,comprimentoMax,dviMin,dviMax,hdmiMin,hdmiMax,mhdmiMin,mhdmiMax,displayMin,displayMax,mdisplayMin,mdisplayMax,slotMin,slotMax,consumoMin,consumoMax,fanless,watercooler,gsync,ledRgb,fabricante,serie,chipset,interface,crossfire,cor,buscar) => {

    query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { preco: { $gte: precoMin }},
            { preco: { $lte: precoMax }},
            { tamanho_memoria: { $gte: memoriaMin }},
            { tamanho_memoria: { $lte: memoriaMax }},
            { core_clock: { $gte: clockMin }},
            { core_clock: { $lte: clockMax }},
            { comprimento: { $gte: comprimentoMin }},
            { comprimento: { $lte: comprimentoMax }},
            { portas_dvi: { $gte: dviMin }},
            { portas_dvi: { $lte: dviMax }},
            { portas_hdmi: { $gte: hdmiMin }},
            { portas_hdmi: { $lte: hdmiMax }},
            { portas_mini_hdmi: { $gte: mhdmiMin }},
            { portas_mini_hdmi: { $lte: mhdmiMax }},
            { portas_display_port: { $gte: displayMin }},
            { portas_display_port: { $lte: displayMax }},
            { portas_mini_display_port: { $gte: mdisplayMin }},
            { portas_mini_display_port: { $lte: mdisplayMax }},
            { slots_ocupados: { $gte: slotMin }},
            { slots_ocupados: { $lte: slotMax }},
            { consumo: { $gte: consumoMin }},
            { consumo: { $lte: consumoMax }},
            { fanless: { $in: parseStringAsArray(fanless) }},
            { water_cooled: { $in: parseStringAsArray(watercooler) }},
            { suporte_gsync: { $in: parseStringAsArray(gsync) }},
            { led_rgb: { $in: parseStringAsArray(ledRgb) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { serie: { $in: parseStringAsArray(serie) }},
            { chipset: { $in: parseStringAsArray(chipset) }},
            { interface: { $in: parseStringAsArray(interface) }},
            { sli_crossfire: { $in: parseStringAsArray(crossfire) }},
            { cor: { $in: parseStringAsArray(cor) }},
        ]
    }

    return query
}