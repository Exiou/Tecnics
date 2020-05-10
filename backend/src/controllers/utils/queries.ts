//importa essa funçãozinha que transforma uma string em array
import parseStringAsArray from './parseStringAsArray'

export const queryLoja = (buscarNome: string,buscarModelo: string,precoMin: number,precoMax: number,fabricante: string, idLoja: any) => {
    let query = {
        $and: [
            { nome: { $regex: `${buscarNome}`, $options: 'i' } },
            { modelo: { $regex: `${buscarModelo}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { lojas: { $elemMatch: { idLoja: { $eq: idLoja } } } }
        ]
    }

    return query
}

//filtros dos campos recebidos no req.query
export const queryProcessador = (buscar: string,precoMin: number,precoMax: number,nucleoMin: number,nucleoMax: number,freqMin: number,freqMax:number,consumoMin:number,consumoMax:number,cooler:string,multithreading:string,ecc:string,virtualizacao:string,fabricante:string,serie:string,familia:string,socket:string,graficos:string) => {
    let query = {
        //$and = retornar verdadeiro apenas se todos os valores forem verdadeiros, assim como o and do mysql
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } }, //$regex = retorna verdadeiro se o campo possui algum valor "igual" à variavel buscar, assim como o like do mysql
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},//$elemMatch = retorna verdadeiro se algum elemento do array possui os valores indicados
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},//$gte = maior ou igual, $lte = menor ou igual
            { nucleo: { $gte: nucleoMin }},
            { nucleo: { $lte: nucleoMax }},
            { frequencia: { $gte: freqMin }},
            { frequencia: { $lte: freqMax }},
            { consumo: { $gte: consumoMin }},
            { consumo: { $lte: consumoMax }},
            { cooler_incluso: { $in: parseStringAsArray(cooler) }},//$in = retorna verdadeiro se cooler_incluso possuir algum dos valores passado no array cooler
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

exports.queryPlacaVideo = (precoMin: any,precoMax: any,memoriaMin: any,memoriaMax: any,clockMin: any,clockMax: any,comprimentoMin: any,comprimentoMax: any,dviMin: any,dviMax: any,hdmiMin: any,hdmiMax: any,mhdmiMin: any,mhdmiMax: any,displayMin: any,displayMax: any,mdisplayMin: any,mdisplayMax: any,slotMin: any,slotMax: any,consumoMin: any,consumoMax: any,fanless: string,watercooler: string,gsync: string,fabricante: string,serie: string,chipset: string,interfacepv: string,crossfire: string,cor: string,buscar: any) => {

    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
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
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { serie: { $in: parseStringAsArray(serie) }},
            { chipset: { $in: parseStringAsArray(chipset) }},
            { interface: { $in: parseStringAsArray(interfacepv) }},
            { sli_crossfire: { $in: parseStringAsArray(crossfire) }},
            { cor: { $in: parseStringAsArray(cor) }},
        ]
    }

    return query
}

exports.queryPlacaMae = (precoMin: any,precoMax: any,portasSata3Min: any,portasSata3Max: any,portasSata6Min: any,portasSata6Max: any,portasSataExpMin: any,portasSataExpMax: any,portasM2Min: any,portasM2Max: any,portasMSataMin: any,portasMSataMax: any,slotsRamMin: any,slotsRamMax: any,ramMaxMin: any,ramMaxMax: any,slotsPcieX16Min: any,slotsPcieX16Max: any,slotsPcieX4Min: any,slotsPcieX4Max: any,slotsPcieX1Min: any,slotsPcieX1Max: any,slotsPciMin: any,slotsPciMax: any,portasEthernetMin: any,portasEthernetMax: any,usb2Min: any,usb2Max: any,usb3Min: any,usb3Max: any,usb31Min: any,usb31Max: any,usbTypec: string,videoOnboard: string,suporteEcc: string,redeWireless: string,bluetooth: string,fabricante: string,socket: string,formato: string,chipset: string,crossfire: string,tipo_memoria: string,cor: string,buscar: any) => {

    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { portas_sata_3gb: { $gte: portasSata3Min }},
            { portas_sata_3gb: { $lte: portasSata3Max }},
            { portas_sata_6gb: { $gte: portasSata6Min }},
            { portas_sata_6gb: { $lte: portasSata6Max }},
            { portas_sata_express: { $gte: portasSataExpMin }},
            { portas_sata_express: { $lte: portasSataExpMax }},
            { portas_m2: { $gte: portasM2Min }},
            { portas_m2: { $lte: portasM2Max }},
            { portas_msata: { $gte: portasMSataMin }},
            { portas_msata: { $lte: portasMSataMax }},
            { slots_ram: { $gte: slotsRamMin }},
            { slots_ram: { $lte: slotsRamMax }},
            { ram_max: { $gte: ramMaxMin }},
            { ram_max: { $lte: ramMaxMax }},
            { slots_pcie_x16: { $gte: slotsPcieX16Min }},
            { slots_pcie_x16: { $lte: slotsPcieX16Max }},
            { slots_pcie_x4: { $gte: slotsPcieX4Min }},
            { slots_pcie_x4: { $lte: slotsPcieX4Max }},
            { slots_pcie_x1: { $gte: slotsPcieX1Min }},
            { slots_pcie_x1: { $lte: slotsPcieX1Max }},
            { slots_pci: { $gte: slotsPciMin }},
            { slots_pci: { $lte: slotsPciMax }},
            { portas_ethernet: { $gte: portasEthernetMin }},
            { portas_ethernet: { $lte: portasEthernetMax }},
            { usb_2: { $gte: usb2Min }},
            { usb_2: { $lte: usb2Max }},
            { usb_3: { $gte: usb3Min }},
            { usb_3: { $lte: usb3Max }},
            { usb_31: { $gte: usb31Min }},
            { usb_31: { $lte: usb31Max }},
            { usb_typec: { $in: parseStringAsArray(usbTypec) }},
            { video_onboard: { $in: parseStringAsArray(videoOnboard) }},
            { suporte_ecc: { $in: parseStringAsArray(suporteEcc) }},
            { rede_wireless: { $in: parseStringAsArray(redeWireless) }},
            { bluetooth: { $in: parseStringAsArray(bluetooth) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { socket: { $in: parseStringAsArray(socket) }},
            { formato: { $in: parseStringAsArray(formato) }},
            { chipset: { $in: parseStringAsArray(chipset) }},
            { crossfire: { $in: parseStringAsArray(crossfire) }},
            { tipo_memoria: { $in: parseStringAsArray(tipo_memoria) }},
            { cor: { $in: parseStringAsArray(cor) }},
        ]
    }

    return query
}

exports.queryMemoria = (precoMin: any,precoMax: any,voltagemMin: any,voltagemMax: any,cas_latencyMin: any,cas_latencyMax: any,suporte_ecc: string,registrada: string,dissipador: string,fabricante: string,velocidade: string,tipo: string,capacidade: string,cor: string,buscar: any) => {
    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { voltagem: { $gte: voltagemMin }},
            { voltagem: { $lte: voltagemMax }},
            { cas_latency: { $gte: cas_latencyMin }},
            { cas_latency: { $lte: cas_latencyMax }},
            { suporte_ecc: { $in: parseStringAsArray(suporte_ecc) }},
            { registrada: { $in: parseStringAsArray(registrada) }},
            { dissipador: { $in: parseStringAsArray(dissipador) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { velocidade: { $in: parseStringAsArray(velocidade) }},
            { tipo: { $in: parseStringAsArray(tipo) }},
            { capacidade: { $in: parseStringAsArray(capacidade) }},
            { cor: { $in: parseStringAsArray(cor) }},
        ]
    }

    return query
}

exports.queryGabinete = (precoMin: any,precoMax: any,baia_externa_525Min: any,baia_externa_525Max: any,baia_externa_350Min: any,baia_externa_350Max: any,baia_interna_350Min: any,baia_interna_350Max: any,baia_interna_250Min: any,baia_interna_250Max: any,fonte: string,janela_lateral: string,painel_frontal_usb3: string,filtro_removivel: string,fabricante: string,tipo: string,cor: string,buscar: any) => {
    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { baia_externa_525: { $gte: baia_externa_525Min }},
            { baia_externa_525: { $lte: baia_externa_525Max }},
            { baia_externa_350: { $gte: baia_externa_350Min }},
            { baia_externa_350: { $lte: baia_externa_350Max }},
            { baia_interna_350: { $gte: baia_interna_350Min }},
            { baia_interna_350: { $lte: baia_interna_350Max }},
            { baia_interna_250: { $gte: baia_interna_250Min }},
            { baia_interna_250: { $lte: baia_interna_250Max }},
            { fonte: { $in: parseStringAsArray(fonte) }},
            { janela_lateral: { $in: parseStringAsArray(janela_lateral) }},
            { painel_frontal_usb3: { $in: parseStringAsArray(painel_frontal_usb3) }},
            { filtro_removivel: { $in: parseStringAsArray(filtro_removivel) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { tipo: { $in: parseStringAsArray(tipo) }},
            { cor: { $in: parseStringAsArray(cor) }},
        ]
    }

    return query
}

exports.queryFonte = (precoMin: any,precoMax: any,potenciaMin: any,potenciaMax: any,fanless: string,modular: string,fabricante: string,tipo: string,certificado: string,buscar: any) => {
    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { potencia: { $gte: potenciaMin }},
            { potencia: { $lte: potenciaMax }},
            { fanless: { $in: parseStringAsArray(fanless) }},
            { modular: { $in: parseStringAsArray(modular) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { tipo: { $in: parseStringAsArray(tipo) }},
            { certificado: { $in: parseStringAsArray(certificado) }},
        ]
    }

    return query
}

exports.queryArmazenamento = (precoMin: any,precoMax: any,capacidadeMin: any,capacidadeMax: any,intellipower: string,hibrido: string,fabricante: string,tipo: string,interfacea: string,formato: string,buffer_cache: string,buscar: any) => {
    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { capacidade: { $gte: capacidadeMin }},
            { capacidade: { $lte: capacidadeMax }},
            { intellipower: { $in: parseStringAsArray(intellipower) }},
            { hibrido: { $in: parseStringAsArray(hibrido) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { tipo: { $in: parseStringAsArray(tipo) }},
            { interface: { $in: parseStringAsArray(interfacea) }},
            { formato: { $in: parseStringAsArray(formato) }},
            { buffer_cache: { $in: parseStringAsArray(buffer_cache) }},
        ]
    }

    return query
}

exports.queryCooler = (precoMin: any,precoMax: any,alturaMin: any,alturaMax: any,fanless: string,fabricante: string,rolamento: string,socket: string,radiador: string,cor: string,buscar: any) => {
    let query = {
        $and: [
            { nome: { $regex: `${buscar}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { altura: { $gte: alturaMin }},
            { altura: { $lte: alturaMax }},
            { fanless: { $in: parseStringAsArray(fanless) }},
            { fabricante: { $in: parseStringAsArray(fabricante) }},
            { rolamento: { $in: parseStringAsArray(rolamento) }},
            { socket: { $in: parseStringAsArray(socket) }},
            { radiador: { $in: parseStringAsArray(radiador) }},
            { cor: { $in: parseStringAsArray(cor) }},
        ]
    }

    return query
}