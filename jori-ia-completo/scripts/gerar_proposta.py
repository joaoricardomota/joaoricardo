#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import json
from datetime import datetime, timedelta
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.pdfgen import canvas

def criar_cabecalho(canvas_obj, doc):
    """Cria cabeçalho profissional em todas as páginas"""
    canvas_obj.saveState()
    
    # Fundo do cabeçalho
    canvas_obj.setFillColorRGB(0.05, 0.15, 0.3)  # Azul escuro
    canvas_obj.rect(0, A4[1] - 3*cm, A4[0], 3*cm, fill=1, stroke=0)
    
    # Logo text estilizado
    canvas_obj.setFillColorRGB(1, 1, 1)  # Branco
    canvas_obj.setFont("Helvetica-Bold", 24)
    canvas_obj.drawString(2*cm, A4[1] - 2*cm, "JORI PAPEL")
    
    canvas_obj.setFont("Helvetica", 9)
    canvas_obj.drawString(2*cm, A4[1] - 2.5*cm, "Grupo Jori Papel • Distribuidor Oficial Santher")
    canvas_obj.drawString(2*cm, A4[1] - 2.8*cm, "40 anos de excelência no mercado")
    
    # Dados da empresa no canto direito
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.drawRightString(A4[0] - 2*cm, A4[1] - 1.8*cm, "Tel: (21) 3393-5566")
    canvas_obj.drawRightString(A4[0] - 2*cm, A4[1] - 2.1*cm, "WhatsApp: (21) 3393-5566")
    canvas_obj.drawRightString(A4[0] - 2*cm, A4[1] - 2.4*cm, "contato@joripapel.com.br")
    canvas_obj.drawRightString(A4[0] - 2*cm, A4[1] - 2.7*cm, "Rua Santa Mariana, 221 - RJ")
    
    canvas_obj.restoreState()

def criar_rodape(canvas_obj, doc):
    """Cria rodapé profissional"""
    canvas_obj.saveState()
    
    # Linha separadora
    canvas_obj.setStrokeColorRGB(0.8, 0.8, 0.8)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(2*cm, 2*cm, A4[0] - 2*cm, 2*cm)
    
    # Texto do rodapé
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.setFillColorRGB(0.4, 0.4, 0.4)
    canvas_obj.drawCentredString(A4[0]/2, 1.5*cm, 
        "Grupo Jori Papel • CNPJ 31.438.302/0001-70 • Distribuidor Oficial Santher")
    canvas_obj.drawCentredString(A4[0]/2, 1.2*cm,
        "Esta proposta tem validade de 7 dias a partir da data de emissão")
    
    # Número da página
    canvas_obj.drawRightString(A4[0] - 2*cm, 1.5*cm, 
        f"Página {doc.page}")
    
    canvas_obj.restoreState()

def gerar_proposta_pdf(dados, output_path):
    """Gera PDF da proposta comercial"""
    
    # Cria documento
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=4*cm,
        bottomMargin=3*cm
    )
    
    # Estilos
    styles = getSampleStyleSheet()
    
    style_titulo = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.HexColor('#0c2340'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    style_subtitulo = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#1e5090'),
        spaceAfter=10,
        spaceBefore=15,
        fontName='Helvetica-Bold'
    )
    
    style_destaque = ParagraphStyle(
        'Destaque',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#047857'),
        fontName='Helvetica-Bold',
        alignment=TA_CENTER,
        spaceAfter=8
    )
    
    style_normal = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=9,
        leading=12
    )
    
    # Lista de elementos
    elementos = []
    
    # Data e número da proposta
    data_hoje = datetime.now()
    numero_proposta = f"JP-{data_hoje.strftime('%Y%m%d')}-{hash(dados['cliente']['razaoSocial']) % 10000:04d}"
    
    elementos.append(Paragraph(
        f"<b>PROPOSTA COMERCIAL Nº {numero_proposta}</b>",
        style_titulo
    ))
    
    elementos.append(Paragraph(
        f"Data: {data_hoje.strftime('%d/%m/%Y')}",
        style_destaque
    ))
    
    elementos.append(Spacer(1, 0.5*cm))
    
    # Dados do Cliente
    elementos.append(Paragraph("DADOS DO CLIENTE", style_subtitulo))
    
    cliente = dados['cliente']
    dados_cliente = [
        ['Razão Social:', cliente.get('razaoSocial', '')],
        ['CNPJ:', cliente.get('cnpj', 'Não informado')],
        ['Endereço:', cliente.get('endereco', '')],
        ['Cidade/UF:', f"{cliente.get('cidade', '')}/{cliente.get('estado', '')}"],
        ['CEP:', cliente.get('cep', '')],
        ['Contato:', cliente.get('contato', 'Não informado')],
        ['Telefone:', cliente.get('telefone', 'Não informado')],
        ['Email:', cliente.get('email', 'Não informado')]
    ]
    
    table_cliente = Table(dados_cliente, colWidths=[4*cm, 13*cm])
    table_cliente.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f1f5f9')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1e293b')),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1'))
    ]))
    
    elementos.append(table_cliente)
    elementos.append(Spacer(1, 0.8*cm))
    
    # Produtos
    elementos.append(Paragraph("PRODUTOS E VALORES", style_subtitulo))
    
    # Cabeçalho da tabela de produtos
    dados_produtos = [[
        Paragraph('<b>Código</b>', style_normal),
        Paragraph('<b>Descrição do Produto</b>', style_normal),
        Paragraph('<b>Embalagem</b>', style_normal),
        Paragraph('<b>Qtd</b>', style_normal),
        Paragraph('<b>Valor Unit.</b>', style_normal),
        Paragraph('<b>Subtotal</b>', style_normal)
    ]]
    
    # Linhas de produtos
    for item in dados['itens']:
        dados_produtos.append([
            Paragraph(f"<b>{item['codigo']}</b>", style_normal),
            Paragraph(item['nome'], style_normal),
            Paragraph(item['embalagem'], style_normal),
            Paragraph(str(item['quantidade']), style_normal),
            Paragraph(f"R$ {item['preco']:.2f}", style_normal),
            Paragraph(f"<b>R$ {item['subtotal']:.2f}</b>", style_normal)
        ])
    
    # Linha de total
    dados_produtos.append([
        '', '', '', '', 
        Paragraph('<b>TOTAL:</b>', style_normal),
        Paragraph(f"<b>R$ {dados['total']:.2f}</b>", 
                 ParagraphStyle('Total', parent=style_normal, 
                              textColor=colors.HexColor('#047857'), 
                              fontSize=11))
    ])
    
    table_produtos = Table(dados_produtos, 
                          colWidths=[2*cm, 6*cm, 3.5*cm, 1.5*cm, 2.5*cm, 2.5*cm])
    
    table_produtos.setStyle(TableStyle([
        # Cabeçalho
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e5090')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        
        # Corpo
        ('BACKGROUND', (0, 1), (-1, -2), colors.white),
        ('TEXTCOLOR', (0, 1), (-1, -2), colors.HexColor('#1e293b')),
        ('ALIGN', (0, 1), (0, -2), 'CENTER'),
        ('ALIGN', (1, 1), (2, -2), 'LEFT'),
        ('ALIGN', (3, 1), (-1, -2), 'CENTER'),
        ('FONTNAME', (0, 1), (-1, -2), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -2), 8),
        ('TOPPADDING', (0, 1), (-1, -2), 6),
        ('BOTTOMPADDING', (0, 1), (-1, -2), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor('#f8fafc')]),
        
        # Total
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#ecfdf5')),
        ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#047857')),
        ('ALIGN', (0, -1), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, -1), (-1, -1), 10),
        ('TOPPADDING', (0, -1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 10),
        
        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1'))
    ]))
    
    elementos.append(table_produtos)
    elementos.append(Spacer(1, 0.8*cm))
    
    # Sistema de Comodato
    elementos.append(Paragraph("🎁 SISTEMA DE COMODATO - DISPENSERS GRÁTIS!", style_subtitulo))
    
    comodato_text = """
    <b>Todos os dispensers são 100% GRATUITOS!</b><br/>
    <br/>
    Esta proposta inclui o fornecimento gratuito de todos os dispensers necessários:<br/>
    • Dispensers para papel higiênico (interfolhado e rolão)<br/>
    • Dispensers para papel toalha<br/>
    • Dispensers para sabonete líquido e álcool gel<br/>
    • Instalação profissional<br/>
    • Manutenção preventiva e corretiva sem custo<br/>
    • Substituição de equipamentos quando necessário<br/>
    • Consultoria especializada<br/>
    <br/>
    <b>Condições do Comodato:</b><br/>
    ✅ ZERO investimento inicial (economia de R$ 3.000 a R$ 15.000)<br/>
    ✅ SEM MULTAS de cancelamento - cancele quando quiser<br/>
    ✅ SEM MÍNIMO MENSAL obrigatório - compre apenas o necessário<br/>
    ✅ Flexibilidade total para sua realidade<br/>
    """
    
    elementos.append(Paragraph(comodato_text, style_normal))
    elementos.append(Spacer(1, 0.6*cm))
    
    # Condições Comerciais
    elementos.append(Paragraph("CONDIÇÕES COMERCIAIS", style_subtitulo))
    
    data_vencimento = data_hoje + timedelta(days=28)
    
    condicoes = [
        ['Prazo de Pagamento:', '<b>28 dias</b>'],
        ['Data de Vencimento:', f'<b>{data_vencimento.strftime("%d/%m/%Y")}</b>'],
        ['Prazo de Entrega:', 'Até 48 horas no Grande Rio'],
        ['Validade da Proposta:', '7 dias corridos'],
        ['Forma de Pagamento:', 'Boleto bancário, PIX ou transferência'],
        ['Produtos:', '100% originais Santher com garantia de fábrica']
    ]
    
    dados_condicoes = [[Paragraph(k, style_normal), Paragraph(v, style_normal)] for k, v in condicoes]
    
    table_condicoes = Table(dados_condicoes, colWidths=[5*cm, 12*cm])
    table_condicoes.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f1f5f9')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1e293b')),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1'))
    ]))
    
    elementos.append(table_condicoes)
    elementos.append(Spacer(1, 0.8*cm))
    
    # Diferenciais
    elementos.append(Paragraph("NOSSOS DIFERENCIAIS", style_subtitulo))
    
    diferenciais_text = """
    ✓ <b>40 anos de experiência</b> no Grande Rio<br/>
    ✓ <b>Distribuidor oficial Santher</b> - produtos 100% originais<br/>
    ✓ <b>Sistema de comodato sem multas</b> e sem mínimo mensal<br/>
    ✓ <b>Dispensers grátis</b> - economia de milhares de reais<br/>
    ✓ <b>Entrega rápida</b> - até 48 horas<br/>
    ✓ <b>Consultor dedicado</b> - acompanhamento personalizado<br/>
    ✓ <b>Manutenção inclusa</b> - sem custos adicionais<br/>
    ✓ <b>Economia comprovada</b> - clientes economizam 30-40% em consumíveis<br/>
    """
    
    elementos.append(Paragraph(diferenciais_text, style_normal))
    elementos.append(Spacer(1, 1*cm))
    
    # Assinatura
    elementos.append(Spacer(1, 1*cm))
    
    assinatura_text = """
    <para alignment="center">
    ____________________________________________<br/>
    <b>Grupo Jori Papel</b><br/>
    Distribuidor Oficial Santher<br/>
    <br/>
    <i>Aguardamos seu retorno!</i><br/>
    <b>Tel/WhatsApp: (21) 3393-5566</b><br/>
    contato@joripapel.com.br
    </para>
    """
    
    elementos.append(Paragraph(assinatura_text, style_normal))
    
    # Gera o PDF
    doc.build(elementos, onFirstPage=criar_cabecalho, onLaterPages=criar_cabecalho)
    
    print(f"PDF gerado com sucesso: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python gerar_proposta.py <input_json> <output_pdf>")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    # Carrega dados
    with open(input_path, 'r', encoding='utf-8') as f:
        dados = json.load(f)
    
    # Gera PDF
    gerar_proposta_pdf(dados, output_path)
