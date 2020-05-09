import { Document } from 'mongoose'

import { ILojas } from './lojaInterface'

export interface IProduto extends Document {
    imagem: string,
    nome: string,
    modelo: string,
    fabricante: string,
    lojas: ILojas[],
    imagem_url: string
}

export interface IProcessador extends IProduto {
    serie: string,
    familia: string,
    socket: string,
    graficos_integrados: string,
    nucleo: number,
    frequencia: number,
    frequencia_turbo:number,
    consumo: number,
    arquitetura: number,
    thread: number,
    litografia: number,
    cooler_incluso: boolean,
    multithreading: boolean,
    suporte_ecc: boolean,
    virtualizacao: boolean
}

export interface IPlacaVideo extends IProduto {
    serie: string,
    chipset: string,
    tipo_memoria: string,
    interface: string,
    sli_crossfire: string,
    cor: string,   
    led_rgb: string,
    tamanho_memoria: number,
    core_clock: number,
    boost_clock: number,
    comprimento: number,
    portas_dvi: number,
    portas_hdmi: number,
    portas_mini_hdmi: number,
    portas_display_port: number,
    portas_mini_display_port: number,
    slots_ocupados: number,
    consumo: number,
    fanless: boolean,
    water_cooled: boolean,
    suporte_gsync: boolean
}

export interface IPlacaMae extends IProduto {
    socket: string,
    formato: string,
    chipset: string,
    crossfire: string,
    tipo_memoria: string,
    cor: string,
    portas_sata_3gb: number,
    portas_sata_6gb: number,
    portas_sata_express: number,
    portas_m2: number,
    portas_msata: number,
    slots_ram: number,
    ram_max: number,
    slots_pcie_x16: number,
    slots_pcie_x4: number,
    slots_pcie_x1: number,
    slots_pci: number,
    portas_ethernet: number,
    usb_2: number,
    usb_3: number,
    usb_31: number,
    usb_typec: boolean,
    video_onboard: boolean,
    suporte_ecc: boolean,
    rede_wireless: boolean,
    bluetooth: boolean
}

export interface IMemoria extends IProduto {
    velocidade: string,
    tipo: string,
    capacidade: string,
    modulo: string,
    cor: string,
    voltagem: number,
    cas_latency: number,
    suporte_ecc: boolean,
    registrada: boolean,
    dissipador: boolean
}

export interface IGabinete extends IProduto {
    tipo: string,
    cor: string,
    led_rgb: string,
    formato_placa_mae: string,
    baia_externa_525: number,
    baia_externa_350: number,
    baia_interna_350: number,
    baia_interna_250: number,
    slot_full_height: number,
    slot_half_height: number,
    potencia_fonte: number,
    peso: number,
    fonte: boolean,
    janela_lateral: boolean,
    painel_frontal_usb3: boolean,
    filtro_removivel: boolean
}

export interface IFonte extends IProduto {
    serie: string,
    tipo: string,
    modular: string,
    certificado: string,
    saida: string,
    potencia: number,
    eficiencia: number,
    peso: number,
    conectores_pcie_6_pinos: number,
    conectores_pcie_6_2_pinos: number,
    fanless: boolean
}

export interface ICooler extends IProduto {
    rolamento: string,
    socket: [string],
    radiador: string,
    cor: string,
    led_rgb: string,
    altura: number,
    rpm_ventoinha: number,
    peso: number,
    fanless: boolean,
    water_cooled: boolean
}

export interface IArmazenamento extends IProduto {
    serie: string,
    tipo: string,
    interface: string,
    formato: string,
    buffer_cache: string,
    rpm: number,
    capacidade: number,
    intellipower: boolean,
    hibrido: boolean
}
