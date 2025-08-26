"use client"; // Marca este componente para rodar no navegador

import Image from 'next/image';
import Script from 'next/script';
import { useState, useEffect } from 'react';

// --- Dados dos Projetos ---
// Movido para fora do componente para melhor organização
const projetos = {
  "mk-store": {
    titulo: "MK Store - E-commerce Moderno",
    imagem: "/MK.jpeg", // Caminho a partir da pasta public
    tecnologias: ["bx bxl-html5", "bx bxl-css3", "bx bxl-javascript"],
    descricaoLonga:
      "MK Store é um projeto de e-commerce funcional e acessível, desenvolvido com o objetivo de oferecer uma plataforma prática para a venda de produtos. Ele simula a experiência completa de uma loja virtual, contemplando todas as etapas essenciais para um fluxo de compra simplificado e eficiente.",
    repoLink: "https://github.com/KaioAlixandre/Monitoramento-de-entregas-MKRa-oes",
    siteLink: "https://mk-racoes.vercel.app/",
  },
  "sistema-bancario": {
    titulo: "Simulador de Banco",
    imagem: "/BC.png", // Caminho a partir da pasta public
    tecnologias: ["bx bxl-java"],
    descricaoLonga:
      "Um sistema completo de simulação bancária, desenvolvido com foco em reforçar os conceitos fundamentais da programação orientada a objetos (POO) e da arquitetura de sistemas. A aplicação simula o ambiente de um banco real, permitindo o gerenciamento de contas, operações financeiras e controle de transações de forma segura e estruturada.",
    repoLink: "https://github.com/KaioAlixandre/Sistema-Bancario",
    siteLink: null, // Sem site para este projeto
  },
};


export default function Home() {
  // Estado para controlar os dados do modal. null = fechado.
  const [modalData, setModalData] = useState(null);

  // Função para abrir o modal com os dados de um projeto específico
  const openModal = (projetoId) => {
    setModalData(projetos[projetoId]);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    // --- Lógica do Menu Toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const menuLinks = document.querySelectorAll(".menu-link");

    const handleMenuToggle = () => menu?.classList.toggle("show");
    const closeMenu = () => menu?.classList.remove("show");

    menuToggle?.addEventListener("click", handleMenuToggle);
    menuLinks.forEach(link => link.addEventListener("click", closeMenu));

    // --- Lógica dos Filtros de Skills ---
    const filtros = document.querySelectorAll(".filtro-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    filtros.forEach((filtro) => {
      filtro.addEventListener("click", () => {
        filtros.forEach((f) => f.classList.remove("active"));
        filtro.classList.add("active");
        const categoria = filtro.getAttribute("data-categoria");

        skillCards.forEach((card) => {
          const categorias = card.getAttribute("data-categorias") || "";
          if (categoria === "todos" || categorias.includes(categoria)) {
            (card as HTMLElement).style.display = "flex";
          } else {
            (card as HTMLElement).style.display = "none";
          }
        });
      });
    });
    
    // --- Animação das barras de progresso ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".progress-bar");
          progressBars.forEach((bar) => {
            const htmlBar = bar as HTMLElement;
            const width = htmlBar.style.width;
            htmlBar.style.width = "0%";
            setTimeout(() => { htmlBar.style.width = width; }, 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector("#skills");
    if (skillsSection) observer.observe(skillsSection);

    // --- Scroll Suave e Menu Ativo ---
    const handleScroll = () => {
        const sections = document.querySelectorAll("section[id], main[id]");
        const scrollPos = window.scrollY + 150;

        sections.forEach((section) => {
            if (scrollPos > section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                document.querySelectorAll(".menu-link").forEach(link => link.classList.remove("active"));
                const navLink = document.querySelector(`.menu-link[href="#${section.id}"]`);
                navLink?.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);

    // Função de limpeza
    return () => {
      menuToggle?.removeEventListener("click", handleMenuToggle);
      menuLinks.forEach(link => link.removeEventListener("click", closeMenu));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="binary-background"></div>
      <header className="header">
        <div className="logo">Kaio</div>
        <nav className="navbar">
          <button className="menu-toggle" id="menu-toggle">&#9776;</button>
          <ul className="menu" id="menu">
            <li><a href="#inicio" className="menu-link">Início</a></li>
            <li><a href="#sobre" className="menu-link">Sobre</a></li>
            <li><a href="#skills" className="menu-link">Skills</a></li>
            <li><a href="#projetos" className="menu-link">Projetos</a></li>
            <li><a href="#servicos" className="menu-link">Serviços</a></li>
            <li><a href="#contatos" className="menu-link">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main id="inicio" className="cabecalho">
        <div className="home-img animate__animated animate__zoomIn">
          <Image src="/perfil.jpg" alt="foto de perfil" width={400} height={400} priority />
        </div>
        <div className="conteudo-apresentacao">
          <h3 className="animate__animated animate__fadeInUp">Olá, meu nome é</h3>
          <h1 className="animate__animated animate__fadeInUp animate__delay-0-5s">Kaio Alixandre</h1>
          <h3 className="animate__animated animate__fadeInUp animate__delay-1s">Eu sou <span className="multiple-text"></span></h3>
          <p className="animate__animated animate__fadeInUp animate__delay-1-5s">
            Sou um desenvolvedor apaixonado por criar soluções digitais inovadoras e experiências únicas que fazem a diferença.
          </p>
          <div className="social-media animate__animated animate__fadeInUp animate__delay-2s">
            <a href="https://wa.me/5599996458528?text=Olá%20Gostaria%20de%20mais%20informações"><i className="bx bxl-whatsapp"></i></a>
            <a href="https://github.com/KaioAlixandre" target="_blank" rel="noopener noreferrer"><i className="bx bxl-github"></i></a>
            <a href="https://www.instagram.com/kaioalixandre/" target="_blank" rel="noopener noreferrer"><i className="bx bxl-instagram"></i></a>
            <a href="mailto:kaioalexandre2681@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bx-envelope"></i>
            </a>
          </div>
          <a href="#projetos" className="btn animate__animated animate__fadeInUp animate__delay-2-5s">Veja meus projetos</a>
        </div>
      </main>

      <section className="sobre" id="sobre">
        <h2 className="sobre-titulo-personalizado-fora-quadro animate__animated animate__fadeInUp">Sobre</h2>
        <div className="sobre-quadro-1 animate__animated animate__zoomIn">
          <h2 className="sobre-titulo-personalizado">Muito prazer, <span className="sobre-titulo-destaque">eu sou Kaio!</span></h2>
          <p className="sobre-texto">
            Sou um <span style={{ color: 'var(--secundaria)', fontWeight: 600 }}>desenvolvedor apaixonado por criar experiências digitais</span> que unem tecnologia, design e propósito. Minha missão é transformar ideias em soluções que encantam e resolvem problemas de verdade.
          </p>
          <div className="sobre-tags">
            <span className="tag">Front-end & Back-end</span>
            <span className="tag">UI/UX</span>
            <span className="tag">APIs</span>
            <span className="tag">Mobile</span>
            <span className="tag">Cloud</span>
          </div>
          <p className="sobre-texto">
            <br />
            Com experiência em <span style={{ color: 'var(--secundaria)', fontWeight: 600 }}>JavaScript, TypeScript, React, Node.js</span> e tecnologias modernas, estou sempre em busca de aprender novas ferramentas e aprimorar minhas habilidades para entregar soluções de qualidade.
          </p>
        </div>
      </section>

      <section id="skills" className="skills">
        <h2 className="skills-titulo animate__animated animate__fadeInUp">Skills</h2>
        <div className="skills-filtros animate__animated animate__fadeInUp animate__delay-0-5s">
          <button className="filtro-btn active" data-categoria="todos">Todos</button>
          <button className="filtro-btn" data-categoria="backend">Backend</button>
          <button className="filtro-btn" data-categoria="frontend">Frontend</button>
          <button className="filtro-btn" data-categoria="banco-de-dados">Banco de Dados</button>
          <button className="filtro-btn" data-categoria="ui-ux-design">UI/UX Design</button>
        </div>
        <div className="skills-grade">
            {/* Cards de Skills Completos */}
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="frontend"><div className="skill-header"><i className='bx bxl-react skill-icon'></i><h3 className="skill-name">React.js</h3></div><div className="skill-details"><span className="skill-percentage">90%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '90%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="backend"><div className="skill-header"><i className='bx bxl-nodejs skill-icon'></i><h3 className="skill-name">Node.js</h3></div><div className="skill-details"><span className="skill-percentage">85%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '85%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="frontend backend"><div className="skill-header"><i className='bx bxl-javascript skill-icon'></i><h3 className="skill-name">JavaScript</h3></div><div className="skill-details"><span className="skill-percentage">95%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '95%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="frontend backend"><div className="skill-header"><i className='bx bxl-typescript skill-icon'></i><h3 className="skill-name">TypeScript</h3></div><div className="skill-details"><span className="skill-percentage">80%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '80%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="backend"><div className="skill-header"><i className='bx bxl-python skill-icon'></i><h3 className="skill-name">Python</h3></div><div className="skill-details"><span className="skill-percentage">75%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '75%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="banco-de-dados"><div className="skill-header"><i className='devicon-postgresql-plain colored skill-icon'></i><h3 className="skill-name">PostgreSQL</h3></div><div className="skill-details"><span className="skill-percentage">80%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '80%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="banco-de-dados"><div className="skill-header"><i className='devicon-mongodb-plain colored skill-icon'></i><h3 className="skill-name">MongoDB</h3></div><div className="skill-details"><span className="skill-percentage">75%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '75%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="ui-ux-design"><div className="skill-header"><i className='bx bxl-figma skill-icon'></i><h3 className="skill-name">Figma</h3></div><div className="skill-details"><span className="skill-percentage">70%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '70%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="frontend"><div className="skill-header"><i className='bx bxl-tailwind-css skill-icon'></i><h3 className="skill-name">Tailwind CSS</h3></div><div className="skill-details"><span className="skill-percentage">85%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '85%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
            <div className="skill-card animate__animated animate__zoomIn" data-categorias="backend"><div className="skill-header"><i className='bx bxl-java skill-icon'></i><h3 className="skill-name">Java</h3></div><div className="skill-details"><span className="skill-percentage">85%</span><div className="progress-bar-container"><div className="progress-bar" style={{width: '90%'}}></div></div><p className="skill-description">Proficiência</p></div></div>
        </div>
        <h3 className="skills-subtitulo animate__animated animate__fadeInUp">Habilidades adicionais</h3>
        <div className="habilidades-adicionais animate__animated animate__fadeInUp animate__delay-0-5s">
          <span className="extra-tag">Git</span><span className="extra-tag">Docker</span><span className="extra-tag">AWS</span><span className="extra-tag">Next.js</span><span className="extra-tag">CI/CD</span><span className="extra-tag">Agile</span><span className="extra-tag">REST API</span><span className="extra-tag">GraphQL</span>
        </div>
      </section>

      <section className="projetos-conteudo projetos" id="projetos">
        <h2 className="projetos-titulo animate__animated animate__fadeInUp">Projetos</h2>
        <div className="sobre-quadro projeto-card animate__animated animate__fadeInUp">
          <Image src="/MK.jpeg" alt="MK Store" className="projeto-imagem" width={500} height={300} />
          <div className="projeto-info">
            <h3 className="projeto-card-titulo">MK Store - Loja Virtual</h3>
            <p className="projeto-card-descricao">MK Store é um projeto de e-commerce simples e funcional...</p>
            <div className="projeto-tecnologias">
              <i className='bx bxl-html5 projeto-tech-icon' title="HTML5"></i>
              <i className='bx bxl-css3 projeto-tech-icon' title="CSS3"></i>
              <i className='bx bxl-javascript projeto-tech-icon' title="JavaScript"></i>
            </div>
            <div className="projeto-botoes">
              <button onClick={() => openModal('mk-store')} className="btn-projeto detalhes">Mais Detalhes</button>
              <a href="https://mk-racoes.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-projeto ver-projeto">Ver Projeto</a>
            </div>
          </div>
        </div>
        <div className="sobre-quadro projeto-card animate__animated animate__fadeInUp">
          <Image src="/BC.png" alt="Simulador de Banco" className="projeto-imagem" width={500} height={300} />
          <div className="projeto-info">
            <h3 className="projeto-card-titulo">Simulador de Banco</h3>
            <p className="projeto-card-descricao">Simulação de um sistema bancário, com interfaces gráficas e conexão ao banco de dados.</p>
            <div className="projeto-tecnologias">
              <i className='bx bxl-java projeto-tech-icon' title="Java"></i>
            </div>
            <div className="projeto-botoes">
              <button onClick={() => openModal('sistema-bancario')} className="btn-projeto detalhes">Mais Detalhes</button>
              <a href="https://github.com/KaioAlixandre/Sistema-Bancario" target="_blank" rel="noopener noreferrer" className="btn-projeto ver-projeto">Ver Projeto</a>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="servicos-section">
        <h2 className="servicos-titulo-principal animate__animated animate__fadeInUp">Serviços</h2>
        <div className="servicos-conteudo">
          <div className="servico animate__animated animate__zoomIn"><i className='bx bx-code-alt servicos-icon' title="Desenvolvimento Web"></i><h3 className="servicos-titulo">Desenvolvimento Web</h3><p className="servicos-descricao">Criação de sites e aplicações web modernas, responsivas e otimizadas para performance e SEO.</p></div>
          <div className="servico animate__animated animate__zoomIn"><i className='bx bx-mobile-alt servicos-icon' title="Desenvolvimento Mobile"></i><h3 className="servicos-titulo">Desenvolvimento Mobile</h3><p className="servicos-descricao">Desenvolvimento de aplicativos móveis nativos e híbridos para iOS e Android.</p></div>
          <div className="servico animate__animated animate__zoomIn"><i className='bx bx-palette servicos-icon' title="UI/UX Design"></i><h3 className="servicos-titulo">UI/UX Design</h3><p className="servicos-descricao">Design de interfaces intuitivas e experiências de usuário que convertem e encantam.</p></div>
        </div>
      </section>

      <section id="contatos" className="contatos">
        <h2 className="contatos-titulo animate__animated animate__fadeInUp">Contato</h2>
        <div className="contatos-conteudo animate__animated animate__fadeInUp animate__delay-0-5s">
          <p className="contatos-texto">Vamos trabalhar juntos? Entre em contato comigo:</p>
          <div className="contatos-sociais">
            <a href="https://www.linkedin.com/in/kaio/" target="_blank" rel="noopener noreferrer" className="contato-link"><i className="bx bxl-linkedin"></i> LinkedIn</a>
            <a href="https://github.com/KaioAlixandre" target="_blank" rel="noopener noreferrer" className="contato-link"><i className="bx bxl-github"></i> GitHub</a>
            <a href="https://wa.me/5599996458528?text=Olá%20Gostaria%20de%20mais%20informações" target="_blank" rel="noopener noreferrer" className="contato-link"><i className="bx bxl-whatsapp"></i> WhatsApp</a>
            <a href="https://www.instagram.com/kaioalixandre/" target="_blank" rel="noopener noreferrer" className="contato-link"><i className="bx bxl-instagram"></i> Instagram</a>
            <a href="mailto:kaioalexandre2681@gmail.com" target="_blank" rel="noopener noreferrer" className="contato-link"><i className="bx bx-envelope"></i> E-mail</a>
          </div>
        </div>
      </section>

      <footer className="rodape">
        <p>&copy; 2025 Kaio. Todos os direitos reservados.</p>
      </footer>
      
      {/* --- Modal dos Projetos --- */}
      {modalData && (
        <div id="projeto-modal" className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="fechar-modal" onClick={closeModal}>&times;</span>
            <Image id="modal-imagem" src={modalData.imagem} alt="Imagem do Projeto" className="modal-imagem" width={800} height={400} />
            <h3 id="modal-titulo" className="modal-titulo">{modalData.titulo}</h3>
            <div className="modal-tecnologias" id="modal-tecnologias">
              {modalData.tecnologias.map((tech, index) => (
                <i key={index} className={`${tech} projeto-tech-icon`}></i>
              ))}
            </div>
            <p id="modal-descricao-longa" className="modal-descricao-longa">{modalData.descricaoLonga}</p>
            <div className="modal-links">
              <a id="modal-repo-link" href={modalData.repoLink} target="_blank" rel="noopener noreferrer" className="btn-modal">Ver no GitHub</a>
              {modalData.siteLink && (
                  <a id="modal-site-link" href={modalData.siteLink} target="_blank" rel="noopener noreferrer" className="btn-modal">Ver Site</a>
              )}
            </div>
          </div>
        </div>
      )}

      <Script 
        src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"
        onLoad={() => {
          new (window as any).Typed(".multiple-text", {
            strings: ["Desenvolvedor", "Designer", "Freelancer", "Criativo"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true,
          });
        }}
      />
    </>
  );
}
