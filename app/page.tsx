// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Tipagem para os projetos do modal
type Projeto = {
  id: string;
  titulo: string;
  imagem: string;        // pode ser /img/... (public) ou URL externa (libere em next.config.js se usar URL)
  tecnologias: string[]; // classes de ícones (boxicons/devicon)
  descricaoLonga: string;
  repoLink: string;
};

const projetosMap: Record<string, Projeto> = {
  "mk-store": {
    id: "mk-store",
    titulo: "E-commerce Moderno",
    imagem: "/img/MK.jpeg",
    tecnologias: [
      "bx bxl-react",
      "bx bxl-nodejs",
      "devicon-postgresql-plain colored",
      "bx bxl-tailwind-css",
    ],
    descricaoLonga:
      "MK Store é um projeto de e-commerce funcional e acessível, desenvolvido com o objetivo de oferecer uma plataforma prática para a venda de produtos agrícolas. Ele simula a experiência completa de uma loja virtual, contemplando todas as etapas essenciais para um fluxo de compra simplificado e eficiente.",
    repoLink:
      "https://github.com/KaioAlixandre/Monitoramento-de-entregas-MKRa-oes",
  },
  "task-manager": {
    id: "task-manager",
    titulo: "Simulador de Banco",
    // Se mantiver URL externa, adicione o domínio em next.config.js -> images.domains
    imagem: "https://via.placeholder.com/800x400/7c3aed/ffffff?text=Task+Manager+Pro",
    tecnologias: [
      "bx bxl-java",
      "bx bxl-typescript",
      "bx bxl-nodejs",
      "devicon-mongodb-plain colored",
    ],
    descricaoLonga:
      "Um sistema completo de simulação bancária, desenvolvido com foco em reforçar os conceitos fundamentais da programação orientada a objetos (POO) e da arquitetura de sistemas. A aplicação simula o ambiente de um banco real, permitindo o gerenciamento de contas, operações financeiras e controle de transações de forma segura e estruturada.",
    repoLink: "https://github.com/KaioAlixandre/Sistema-Bancario",
  },
  "weather-app": {
    id: "weather-app",
    titulo: "App de Clima",
    imagem: "https://via.placeholder.com/800x400/0f172a/ffffff?text=Weather+App",
    tecnologias: ["bx bxl-react", "bx bxl-javascript", "bx bx-data", "bx bxl-css3"],
    descricaoLonga:
      "Aplicativo de previsão do tempo que utiliza APIs externas para fornecer informações meteorológicas precisas. Inclui geolocalização, busca por cidade, previsão de 7 dias e alertas.",
    repoLink: "https://github.com/kaio/weather-app",
  },
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategoria, setActiveCategoria] = useState<string>("todos");
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);

  // Efeito de digitação (Typed.js)
  useEffect(() => {
    // Tipo mínimo necessário (evita usar "any")
    interface TypedLike { destroy(): void }
    type TypedCtor = new (
      el: string | Element,
      opts: {
        strings: string[];
        typeSpeed?: number;
        backSpeed?: number;
        backDelay?: number;
        loop?: boolean;
      }
    ) => TypedLike;

    let typedInstance: TypedLike | null = null;
    let mounted = true;

    (async () => {
      const mod = await import("typed.js");
      const Typed = (mod.default as unknown) as TypedCtor;
      if (!mounted) return;
      typedInstance = new Typed(".multiple-text", {
        strings: ["Desenvolvedor", "Designer", "Freelancer", "Criativo"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      });
    })();

    return () => {
      mounted = false;
      typedInstance?.destroy();
    };
  }, []);

  // Animação das barras de progresso quando a seção entra na viewport
  useEffect(() => {
    if (!skillsRef.current) return;

    const options: IntersectionObserverInit = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll<HTMLDivElement>(".progress-bar");
          bars.forEach((bar) => {
            const finalWidth = bar.getAttribute("data-width") || bar.style.width || "0%";
            bar.style.width = "0%";
            setTimeout(() => {
              bar.style.width = finalWidth;
            }, 200);
          });
          obs.unobserve(entry.target);
        }
      });
    }, options);

    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  // Destaque do link do menu baseado na seção atual
  useEffect(() => {
    const sectionIds = ["inicio", "sobre", "skills", "projetos", "servicos", "contatos"];
    const onScroll = () => {
      const scrollPos = window.scrollY + 100; // offset para header
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos <= bottom) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Abertura/fechamento do modal de projetos
  const abrirDetalhes = (id: string) => {
    const p = projetosMap[id];
    if (p) {
      setSelectedProjeto(p);
      setModalOpen(true);
    }
  };
  const fecharModal = () => {
    setModalOpen(false);
    setSelectedProjeto(null);
  };

  // Helper para classe "active" do menu
  const isActiveLink = (id: string) => (activeSection === id ? "active" : "");

  // Helper para exibição dos cards de skill
  const showSkill = (categorias: string) =>
    activeCategoria === "todos" || categorias.split(" ").includes(activeCategoria);

  return (
    <>
      {/* Background animado de código binário */}
      <div className="binary-background" />

      {/* menu superior */}
      <header className="header">
        <div className="logo">Kaio</div>
        <nav className="navbar">
          <button
            className="menu-toggle"
            id="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            &#9776;
          </button>
          <ul className={`menu ${menuOpen ? "show" : ""}`} id="menu">
            <li>
              <a
                href="#inicio"
                className={`menu-link ${isActiveLink("inicio")}`}
                onClick={() => setMenuOpen(false)}
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#sobre"
                className={`menu-link ${isActiveLink("sobre")}`}
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`menu-link ${isActiveLink("skills")}`}
                onClick={() => setMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projetos"
                className={`menu-link ${isActiveLink("projetos")}`}
                onClick={() => setMenuOpen(false)}
              >
                Projetos
              </a>
            </li>
            <li>
              <a
                href="#servicos"
                className={`menu-link ${isActiveLink("servicos")}`}
                onClick={() => setMenuOpen(false)}
              >
                Serviços
              </a>
            </li>
            <li>
              <a
                href="#contatos"
                className={`menu-link ${isActiveLink("contatos")}`}
                onClick={() => setMenuOpen(false)}
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* apresentação */}
      <main id="inicio" className="cabecalho">
        <div className="home-img animate__animated animate__zoomIn">
          <Image
            src="/img/perfil.jpg"
            alt="Foto de perfil"
            width={420}
            height={420}
            priority
          />
        </div>

        <div className="conteudo-apresentacao">
          <h3 className="animate__animated animate__fadeInUp">Olá, meu nome é</h3>
          {/* animate.css: se usar frações, confira a classe disponível na versão do CDN */}
          <h1 className="animate__animated animate__fadeInUp animate__delay-1s">Kaio Alixandre</h1>
          <h3 className="animate__animated animate__fadeInUp animate__delay-1s">
            Eu sou <span className="multiple-text" />
          </h3>
          <p className="animate__animated animate__fadeInUp animate__delay-2s">
            Sou um desenvolvedor apaixonado por criar soluções digitais inovadoras e experiências únicas que fazem a diferença.
          </p>

          <div className="social-media animate__animated animate__fadeInUp animate__delay-2s">
            <a
              href="https://wa.me/5599996458528?text=Ol%C3%A1%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="bx bxl-whatsapp" />
            </a>
            <a href="https://github.com/KaioAlixandre" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-github" />
            </a>
            <a href="https://www.instagram.com/kaioalixandre/" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-instagram" />
            </a>
            <a href="mailto:kaioalexandre2681@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bx-envelope" />
            </a>
          </div>
          <a href="#projetos" className="btn animate__animated animate__fadeInUp animate__delay-2s">
            Veja meus projetos
          </a>
        </div>
      </main>

      {/* sobre mim */}
      <section className="sobre" id="sobre">
        <h2 className="sobre-titulo-personalizado-fora-quadro animate__animated animate__fadeInUp">Sobre</h2>
        <div className="sobre-quadro-1 animate__animated animate__zoomIn">
          <h2 className="sobre-titulo-personalizado">
            Muito prazer, <span className="sobre-titulo-destaque">eu sou Kaio!</span>
          </h2>
          <p className="sobre-texto">
            Sou um{" "}
            <span style={{ color: "var(--secundaria)", fontWeight: 600 }}>
              desenvolvedor apaixonado por criar experiências digitais
            </span>{" "}
            que unem tecnologia, design e propósito. Minha missão é transformar ideias em soluções que encantam e resolvem problemas de verdade.
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
            Com experiência em{" "}
            <span style={{ color: "var(--secundaria)", fontWeight: 600 }}>
              JavaScript, TypeScript, React, Node.js
            </span>{" "}
            e tecnologias modernas, estou sempre em busca de aprender novas ferramentas e aprimorar minhas habilidades para entregar soluções de qualidade.
          </p>
        </div>
      </section>

      {/* conhecimentos e habilidades */}
      <section id="skills" className="skills" ref={skillsRef}>
        <h2 className="skills-titulo animate__animated animate__fadeInUp">Skills</h2>

        <div className="skills-filtros animate__animated animate__fadeInUp animate__delay-1s">
          {[
            { key: "todos", label: "Todos" },
            { key: "backend", label: "Backend" },
            { key: "frontend", label: "Frontend" },
            { key: "banco-de-dados", label: "Banco de Dados" },
            { key: "ui-ux-design", label: "UI/UX Design" },
          ].map((f) => (
            <button
              key={f.key}
              className={`filtro-btn ${activeCategoria === f.key ? "active" : ""}`}
              data-categoria={f.key}
              onClick={() => setActiveCategoria(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="skills-grade">
          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="frontend"
            style={{ display: showSkill("frontend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-react skill-icon" />
              <h3 className="skill-name">React.js</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">90%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="90%" style={{ width: "90%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="backend"
            style={{ display: showSkill("backend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-nodejs skill-icon" />
              <h3 className="skill-name">Node.js</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">85%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="85%" style={{ width: "85%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="frontend backend"
            style={{ display: showSkill("frontend backend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-javascript skill-icon" />
              <h3 className="skill-name">JavaScript</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">95%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="95%" style={{ width: "95%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="frontend backend"
            style={{ display: showSkill("frontend backend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-typescript skill-icon" />
              <h3 className="skill-name">TypeScript</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">80%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="80%" style={{ width: "80%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="backend"
            style={{ display: showSkill("backend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-python skill-icon" />
              <h3 className="skill-name">Python</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">75%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="75%" style={{ width: "75%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="banco-de-dados"
            style={{ display: showSkill("banco-de-dados") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="devicon-postgresql-plain colored skill-icon" />
              <h3 className="skill-name">PostgreSQL</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">80%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="80%" style={{ width: "80%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="banco-de-dados"
            style={{ display: showSkill("banco-de-dados") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="devicon-mongodb-plain colored skill-icon" />
              <h3 className="skill-name">MongoDB</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">75%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="75%" style={{ width: "75%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="ui-ux-design"
            style={{ display: showSkill("ui-ux-design") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-figma skill-icon" />
              <h3 className="skill-name">Figma</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">70%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="70%" style={{ width: "70%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="frontend"
            style={{ display: showSkill("frontend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-tailwind-css skill-icon" />
              <h3 className="skill-name">Tailwind CSS</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">85%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="85%" style={{ width: "85%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>

          <div
            className="skill-card animate__animated animate__zoomIn"
            data-categorias="frontend"
            style={{ display: showSkill("frontend") ? "flex" : "none" }}
          >
            <div className="skill-header">
              <i className="bx bxl-java skill-icon" />
              <h3 className="skill-name">Java</h3>
            </div>
            <div className="skill-details">
              <span className="skill-percentage">85%</span>
              <div className="progress-bar-container">
                <div className="progress-bar" data-width="90%" style={{ width: "90%" }} />
              </div>
              <p className="skill-description">Proficiência</p>
            </div>
          </div>
        </div>

        <h3 className="skills-subtitulo animate__animated animate__fadeInUp">Habilidades adicionais</h3>
        <div className="habilidades-adicionais animate__animated animate__fadeInUp animate__delay-1s">
          <span className="extra-tag">Git</span>
          <span className="extra-tag">Docker</span>
          <span className="extra-tag">AWS</span>
          <span className="extra-tag">Next.js</span>
          <span className="extra-tag">CI/CD</span>
          <span className="extra-tag">Agile</span>
          <span className="extra-tag">REST API</span>
          <span className="extra-tag">GraphQL</span>
        </div>
      </section>

      {/* projetos */}
      <h2 className="projetos-titulo animate__animated animate__fadeInUp" id="projetos">
        Projetos
      </h2>
      <section className="projetos-conteudo projetos">
        <div className="sobre-quadro projeto-card animate__animated animate__fadeInUp">
          <Image
            src="/img/MK.jpeg"
            alt="MK Store"
            width={1200}
            height={220}
            className="projeto-imagem"
          />
          <div className="projeto-info">
            <h3 className="projeto-card-titulo">MK Strore - Loja Virtual</h3>
            <p className="projeto-card-descricao">
              MK Store é um projeto de e-commerce simples e funcional. A loja exibe uma variedade de produtos como águas, carvões, grãos e rações com sistema de pesquisa, adicionar ao carrinho, modal de confirmação e finalização de pedido com nome e endereço.
            </p>
            <div className="projeto-tecnologias">
              <i className="bx bxl-html5 projeto-tech-icon" title="HTML5" />
              <i className="bx bxl-css3 projeto-tech-icon" title="CSS3" />
              <i className="bx bxl-javascript projeto-tech-icon" title="JavaScript" />
            </div>
            <div className="projeto-botoes">
              <a
                href="https://mk-racoes.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-projeto ver-projeto"
              >
                Ver Projeto
              </a>
              <button className="btn-projeto detalhes" onClick={() => abrirDetalhes("mk-store")}>
                Detalhes
              </button>
            </div>
          </div>
        </div>

        <div className="sobre-quadro projeto-card animate__animated animate__fadeInUp">
          <Image
            src="/img/BC.png"
            alt="Simulador de Banco"
            width={1200}
            height={220}
            className="projeto-imagem"
          />
          <div className="projeto-info">
            <h3 className="projeto-card-titulo">Simulador de Banco</h3>
            <p className="projeto-card-descricao">
              Simulação de um sistema bancário, com interfaces gráficas e conexão ao banco de dados.
            </p>
            <div className="projeto-tecnologias">
              <i className="bx bxl-java projeto-tech-icon" title="Java" />
            </div>
            <div className="projeto-botoes">
              <a
                href="https://github.com/KaioAlixandre/Sistema-Bancario"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-projeto ver-projeto"
              >
                Ver Projeto
              </a>
              <button className="btn-projeto detalhes" onClick={() => abrirDetalhes("task-manager")}>
                Detalhes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de detalhes dos projetos */}
      <div
        id="projeto-modal"
        className={`modal ${modalOpen ? "active" : ""}`}
        onClick={(e) => e.target === e.currentTarget && fecharModal()}
      >
        <div className="modal-content">
          <button className="fechar-modal" onClick={fecharModal} aria-label="Fechar">
            &times;
          </button>

          {/* Imagem do modal */}
          <Image
            id="modal-imagem"
            src={selectedProjeto?.imagem || "/img/placeholder.svg"}
            alt={selectedProjeto?.titulo || "Imagem do Projeto"}
            width={800}
            height={400}
            className="modal-imagem"
          />

          <h3 id="modal-titulo" className="modal-titulo">
            {selectedProjeto?.titulo}
          </h3>

          <div className="modal-tecnologias" id="modal-tecnologias">
            {selectedProjeto?.tecnologias.map((t) => (
              <i key={t} className={`${t} projeto-tech-icon`} />
            ))}
          </div>

          <p id="modal-descricao-longa" className="modal-descricao-longa">
            {selectedProjeto?.descricaoLonga}
          </p>

          <div className="modal-links">
            {selectedProjeto?.repoLink && (
              <a
                id="modal-repo-link"
                href={selectedProjeto.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal"
              >
                Ver no GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* serviços oferecidos */}
      <section id="servicos" className="servicos-section">
        <h2 className="servicos-titulo-principal animate__animated animate__fadeInUp">Serviços</h2>
        <div className="servicos-conteudo">
          <div className="servico animate__animated animate__zoomIn">
            <i className="bx bx-code-alt servicos-icon" title="Desenvolvimento Web" />
            <h3 className="servicos-titulo">Desenvolvimento Web</h3>
            <p className="servicos-descricao">
              Criação de sites e aplicações web modernas, responsivas e otimizadas para performance e SEO.
            </p>
          </div>
          <div className="servico animate__animated animate__zoomIn">
            <i className="bx bx-mobile-alt servicos-icon" title="Desenvolvimento Mobile" />
            <h3 className="servicos-titulo">Desenvolvimento Mobile</h3>
            <p className="servicos-descricao">
              Desenvolvimento de aplicativos móveis nativos e híbridos para iOS e Android.
            </p>
          </div>
          <div className="servico animate__animated animate__zoomIn">
            <i className="bx bx-palette servicos-icon" title="UI/UX Design" />
            <h3 className="servicos-titulo">UI/UX Design</h3>
            <p className="servicos-descricao">
              Design de interfaces intuitivas e experiências de usuário que convertem e encantam.
            </p>
          </div>
        </div>
      </section>

      {/* contato */}
      <section id="contatos" className="contatos">
        <h2 className="contatos-titulo animate__animated animate__fadeInUp">Contato</h2>
        <div className="contatos-conteudo animate__animated animate__fadeInUp animate__delay-1s">
          <p className="contatos-texto">Vamos trabalhar juntos? Entre em contato comigo:</p>
          <div className="contatos-sociais">
            <a
              href="https://www.linkedin.com/in/kaio/"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-link"
            >
              <i className="bx bxl-linkedin" /> LinkedIn
            </a>
            <a
              href="https://github.com/KaioAlixandre"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-link"
            >
              <i className="bx bxl-github" /> GitHub
            </a>
            <a
              href="https://wa.me/5599996458528?text=Ol%C3%A1%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-link"
            >
              <i className="bx bxl-whatsapp" /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/kaioalixandre/"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-link"
            >
              <i className="bx bxl-instagram" /> Instagram
            </a>
            <a
              href="mailto:kaioalexandre2681@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-link"
            >
              <i className="bx bx-envelope" /> E-mail
            </a>
          </div>
        </div>
      </section>

      <footer className="rodape">
        <p>© 2025 Kaio. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
