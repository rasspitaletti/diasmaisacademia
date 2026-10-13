'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, Check, Clock, Info, MapPin, Menu, Navigation, Phone, Star, X } from 'lucide-react'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/brand-icons'
import {
  aboutPhotos,
  bento,
  contact,
  heroPhotos,
  highlights,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  mapsSearchUrl,
  messages,
  modalities,
  otherClasses,
  plans,
  plansAreDemo,
  baseMonthly,
  formatBRL,
  schedule,
  scheduleUpdatedAt,
  startSteps,
  weeklyClassCount,
  whatsappLink,
  type Photo,
} from '@/lib/site-data'

const navLinks = [
  { href: '#academia', label: 'A academia' },
  { href: '#estrutura', label: 'Estrutura' },
  { href: '#modalidades', label: 'Modalidades' },
  { href: '#horarios', label: 'Horários' },
  { href: '#planos', label: 'Planos' },
  { href: '#contato', label: 'Contato' },
]

/** Atributos padrão para links externos (nova aba, sem vazar a página de origem). */
const external = { target: '_blank', rel: 'noopener noreferrer' } as const

/** Foto com enquadramento ajustável e selo quando for imagem de banco. */
function SitePhoto({ photo, className, sizes, eager }: { photo: Photo; className?: string; sizes?: string; eager?: boolean }) {
  return (
    <figure className={`photo ${className ?? ''}`}>
      <img
        src={photo.image}
        alt={photo.alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition: photo.focus ?? 'center' }}
      />
    </figure>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDay, setActiveDay] = useState(schedule[0].id)
  const closeMenu = () => setMenuOpen(false)

  // Cabeçalho ganha fundo depois de rolar a página.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Grade no celular abre no dia de hoje (domingo mostra segunda).
  useEffect(() => {
    const today = new Date().getDay() // 0 = domingo
    const index = today === 0 ? 0 : today - 1
    if (schedule[index]) setActiveDay(schedule[index].id)
  }, [])

  // Menu móvel: fecha com Esc e trava a rolagem do fundo enquanto aberto.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.classList.add('menu-locked')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('menu-locked')
    }
  }, [menuOpen])

  // Animações de entrada leves ao rolar (desligadas com prefers-reduced-motion via CSS).
  useEffect(() => {
    document.documentElement.classList.add('js')
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const currentDay = schedule.find((day) => day.id === activeDay) ?? schedule[0]

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      {/* ───────────── CABEÇALHO ───────────── */}
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Dias Mais Fitness, voltar ao início">
            <img src="/images/logo-dias-mais-fitness.png" alt="" width={56} height={56} />
            <span className="brand-name">
              Dias Mais <b>Fitness</b>
            </span>
          </a>

          <nav id="menu-principal" className="main-nav" aria-label="Navegação principal">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-mobile-contacts">
              <a className="btn btn-primary btn-block" href={whatsappLink(messages.trial)} {...external} onClick={closeMenu}>
                <WhatsAppIcon size={18} /> Agendar aula experimental
              </a>
              <a href={contact.phoneHref} onClick={closeMenu}>
                <Phone size={18} aria-hidden="true" /> {contact.phoneDisplay}
              </a>
              <a href={contact.instagram} {...external} onClick={closeMenu}>
                <InstagramIcon size={18} /> {contact.instagramHandle}
              </a>
            </div>
          </nav>

          <div className="header-actions">
            <a className="icon-button" href={contact.instagram} {...external} aria-label="Instagram da Dias Mais Fitness (abre em nova aba)">
              <InstagramIcon size={20} />
            </a>
            <a className="btn btn-primary btn-sm header-cta" href={whatsappLink(messages.trial)} {...external}>
              <WhatsAppIcon size={18} />
              <span>Aula experimental</span>
            </a>
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-principal"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="conteudo">
        {/* ───────────── HERO ───────────── */}
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                Mais força.
                <br />
                Mais saúde.
                <br />
                <span>Mais dias de evolução.</span>
              </h1>
              <p className="hero-text">
                Musculação, lutas e {weeklyClassCount} aulas coletivas por semana no Jaguaribe, em Osasco. Treine no seu ritmo, com
                estrutura completa e uma equipe que acompanha a sua evolução.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href={whatsappLink(messages.trial)} {...external}>
                  <WhatsAppIcon size={20} />
                  Agendar aula experimental
                </a>
                <a className="btn btn-ghost btn-lg" href="#planos">
                  Ver planos
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
              <ul className="hero-facts" aria-label="Destaques">
                <li>
                  <a href={mapsSearchUrl} {...external}>
                    <strong>
                      {contact.googleRating}
                      <Star size={18} aria-hidden="true" />
                    </strong>
                    <span>{contact.googleReviews} avaliações no Google</span>
                  </a>
                </li>
                <li>
                  <a href="#horarios">
                    <strong>{weeklyClassCount}</strong>
                    <span>aulas coletivas por semana</span>
                  </a>
                </li>
                <li>
                  <a href="#modalidades">
                    <strong>{modalities.length}</strong>
                    <span>modalidades</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <SitePhoto photo={heroPhotos.main} className="hero-photo-main" eager />
              <SitePhoto photo={heroPhotos.detail} className="hero-photo-detail" eager />
              <a className="hero-address" href={mapsDirectionsUrl} {...external}>
                <MapPin size={18} aria-hidden="true" />
                <span>
                  <strong>Av. Flora, 1052</strong>
                  Jaguaribe · Osasco
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ───────────── A ACADEMIA ───────────── */}
        <section className="section section-light" id="academia" aria-labelledby="academia-title">
          <div className="container about-grid">
            <div className="about-copy">
              <p className="kicker reveal">A academia</p>
              <h2 id="academia-title" className="reveal">
                Uma academia de bairro com <span>estrutura completa.</span>
              </h2>
              <p className="lead reveal">
                A Dias Mais Fitness fica na Av. Flora, no Jaguaribe, e reúne musculação, lutas e aulas coletivas no mesmo lugar. Dá
                para treinar antes do trabalho, no horário do almoço ou à noite.
              </p>
              <ul className="highlights reveal">
                {highlights.map((item) => (
                  <li key={item.title}>
                    <Check size={20} aria-hidden="true" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a className="text-link reveal" href={whatsappLink(messages.visit)} {...external}>
                Agendar uma visita <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="about-photos reveal">
              <SitePhoto photo={aboutPhotos[0]} className="about-photo-main" />
              <SitePhoto photo={aboutPhotos[1]} className="about-photo-side" />
              <p className="about-caption">
                <MapPin size={16} aria-hidden="true" /> Mais fotos da academia no {contact.instagramHandle}
              </p>
            </div>
          </div>
        </section>

        {/* ───────────── ESTRUTURA ───────────── */}
        <section className="section section-dark" id="estrutura" aria-labelledby="estrutura-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="kicker reveal">Estrutura</p>
                <h2 id="estrutura-title" className="reveal">
                  Espaço para cada <span>tipo de treino.</span>
                </h2>
              </div>
              <p className="section-head-text reveal">
                Musculação, peso livre, cardio, funcional e aulas coletivas: um espaço completo para cada objetivo.
              </p>
            </div>
            <ul className="bento">
              {bento.map((item, index) => (
                <li
                  key={item.title}
                  className={`bento-item bento-${item.size} reveal`}
                  style={{ '--delay': `${index * 50}ms` } as CSSProperties}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: item.focus ?? 'center' }}
                  />
                  <div className="bento-caption">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── MODALIDADES ───────────── */}
        <section className="section" id="modalidades" aria-labelledby="modalidades-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="kicker reveal">Modalidades</p>
                <h2 id="modalidades-title" className="reveal">
                  Musculação, lutas <span>e aulas coletivas.</span>
                </h2>
              </div>
              <p className="section-head-text reveal">
                Escolha uma atividade ou combine várias na semana. Toque em uma modalidade para perguntar sobre ela no WhatsApp.
              </p>
            </div>

            <ul className="modality-grid">
              {modalities.map((m, index) => (
                <li className="modality-card reveal" key={m.title} style={{ '--delay': `${(index % 4) * 60}ms` } as CSSProperties}>
                  <SitePhoto photo={m} />
                  <div className="modality-body">
                    <span className="modality-category">{m.category}</span>
                    <h3>{m.title}</h3>
                    <p>{m.description}</p>
                    <a
                      className="modality-link"
                      href={whatsappLink(`Olá! Quero saber mais sobre ${m.title} na Dias Mais Fitness.`)}
                      {...external}
                      aria-label={`Perguntar sobre ${m.title} no WhatsApp`}
                    >
                      Perguntar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="other-classes reveal">
              <span>Também na grade:</span>
              <ul>
                {otherClasses.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────── HORÁRIOS ───────────── */}
        <section className="section section-light" id="horarios" aria-labelledby="horarios-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="kicker reveal">Horários</p>
                <h2 id="horarios-title" className="reveal">
                  Grade de <span>aulas coletivas.</span>
                </h2>
              </div>
              <p className="section-head-text reveal">
                Grade divulgada pela academia em {scheduleUpdatedAt}. Os horários podem mudar, então confirme antes de ir.
              </p>
            </div>

            <div className="reveal">
            {/* Celular: um dia por vez */}
            <div className="schedule-mobile">
              <div className="day-tabs" role="tablist" aria-label="Dia da semana">
                {schedule.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    role="tab"
                    id={`tab-${day.id}`}
                    aria-selected={day.id === activeDay}
                    aria-controls="painel-dia"
                    className={day.id === activeDay ? 'is-active' : ''}
                    onClick={() => setActiveDay(day.id)}
                  >
                    {day.short}
                  </button>
                ))}
              </div>
              <div id="painel-dia" role="tabpanel" aria-labelledby={`tab-${currentDay.id}`} className="day-panel">
                <p className="day-title">{currentDay.label}</p>
                <ul>
                  {currentDay.classes.map((slot) => (
                    <li key={`${slot.time}-${slot.name}`}>
                      <time>{slot.time}</time>
                      <span>{slot.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Computador: semana inteira */}
            <div className="schedule-desktop">
              {schedule.map((day) => (
                <div className="schedule-col" key={day.id}>
                  <p className="schedule-day">{day.label}</p>
                  <ul>
                    {day.classes.map((slot) => (
                      <li key={`${slot.time}-${slot.name}`}>
                        <time>{slot.time}</time>
                        <span>{slot.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            </div>

            <div className="schedule-footer reveal">
              <p>
                <Clock size={18} aria-hidden="true" />
                <span>
                  <strong>Musculação:</strong> livre no horário de funcionamento. {contact.hoursNote}
                </span>
              </p>
              <a className="btn btn-outline" href={whatsappLink(messages.schedule)} {...external}>
                <WhatsAppIcon size={18} /> Confirmar horários
              </a>
            </div>
          </div>
        </section>

        {/* ───────────── PLANOS ───────────── */}
        <section className="section" id="planos" aria-labelledby="planos-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="kicker reveal">Planos</p>
                <h2 id="planos-title" className="reveal">
                  Escolha como <span>quer treinar.</span>
                </h2>
              </div>
              <p className="section-head-text reveal">
                Quanto maior o plano, menor o valor por mês. Chame no WhatsApp e tire suas dúvidas antes de fechar.
              </p>
            </div>

            {plansAreDemo && (
              <p className="demo-note reveal" role="note">
                <Info size={18} aria-hidden="true" />
                Valores demonstrativos para apresentação do site. Os preços oficiais são definidos pela academia.
              </p>
            )}

            <ul className="plan-grid">
              {plans.map((plan) => {
                const total = plan.monthly * plan.months
                const savings = (baseMonthly - plan.monthly) * plan.months
                return (
                  <li className={`plan-card reveal${plan.featured ? ' is-featured' : ''}`} key={plan.id}>
                    <div className="plan-top">
                      <h3>{plan.title}</h3>
                      {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                    </div>
                    <div className="plan-price">
                      <strong>{formatBRL(plan.monthly)}</strong>
                      <span>/mês</span>
                    </div>
                    <p className="plan-note">
                      {plan.months === 1
                        ? 'Cobrança mensal'
                        : `${plan.months} meses · total de ${formatBRL(total)}`}
                    </p>
                    <ul className="plan-includes">
                      {plan.benefits.map((item) => (
                        <li key={item}>
                          <Check size={16} aria-hidden="true" /> {item}
                        </li>
                      ))}
                      {savings > 0 && (
                        <li className="plan-saving">
                          <Check size={16} aria-hidden="true" /> Economia de {formatBRL(savings)} no período
                        </li>
                      )}
                    </ul>
                    <a
                      className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-block`}
                      href={whatsappLink(`Olá! Quero saber mais sobre o plano ${plan.title.toLowerCase()} da Dias Mais Fitness.`)}
                      {...external}
                    >
                      <WhatsAppIcon size={18} />
                      Quero este plano
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ───────────── COMO COMEÇAR ───────────── */}
        <section className="section section-dark" id="comecar" aria-labelledby="comecar-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="kicker reveal">Como começar</p>
                <h2 id="comecar-title" className="reveal">
                  Do primeiro contato <span>ao primeiro treino.</span>
                </h2>
              </div>
              <div className="start-actions reveal">
                <a className="btn btn-primary btn-lg" href={whatsappLink(messages.trial)} {...external}>
                  <WhatsAppIcon size={20} /> Agendar aula experimental
                </a>
                <a className="btn btn-ghost btn-lg" href={contact.phoneHref}>
                  <Phone size={18} aria-hidden="true" /> {contact.phoneDisplay}
                </a>
              </div>
            </div>
            <ol className="steps">
              {startSteps.map((step, index) => (
                <li key={step.title} className="reveal" style={{ '--delay': `${index * 80}ms` } as CSSProperties}>
                  <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── CONTATO E LOCALIZAÇÃO ───────────── */}
        <section className="section section-light" id="contato" aria-labelledby="contato-title">
          <div className="container contact-grid">
            <div>
              <p className="kicker reveal">Contato</p>
              <h2 id="contato-title" className="reveal">
                Venha conhecer <span>a academia.</span>
              </h2>
              <ul className="contact-list reveal">
                <li>
                  <MapPin size={20} aria-hidden="true" />
                  <div>
                    <strong>Endereço</strong>
                    <p>
                      {contact.addressLine1}
                      <br />
                      {contact.addressLine2}
                    </p>
                  </div>
                </li>
                <li>
                  <Phone size={20} aria-hidden="true" />
                  <div>
                    <strong>Telefone e WhatsApp</strong>
                    <p>
                      <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                    </p>
                  </div>
                </li>
                <li>
                  <Clock size={20} aria-hidden="true" />
                  <div>
                    <strong>Horário</strong>
                    <p>{contact.hoursNote}</p>
                  </div>
                </li>
                <li>
                  <Star size={20} aria-hidden="true" />
                  <div>
                    <strong>Avaliações</strong>
                    <p>
                      Nota {contact.googleRating} com {contact.googleReviews} avaliações.{' '}
                      <a href={mapsSearchUrl} {...external}>
                        Ler no Google
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
              <div className="contact-actions reveal">
                <a className="btn btn-primary" href={whatsappLink()} {...external}>
                  <WhatsAppIcon size={18} /> Chamar no WhatsApp
                </a>
                <a className="btn btn-ghost" href={mapsDirectionsUrl} {...external}>
                  <Navigation size={18} aria-hidden="true" /> Como chegar
                </a>
              </div>
              <div className="social-row reveal">
                <a href={contact.instagram} {...external} aria-label="Instagram (abre em nova aba)">
                  <InstagramIcon size={20} />
                </a>
                <a href={contact.facebook} {...external} aria-label="Facebook (abre em nova aba)">
                  <FacebookIcon size={20} />
                </a>
              </div>
            </div>
            <div className="map-frame reveal">
              <iframe
                title={`Mapa: ${contact.name}, ${contact.addressFull}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ───────────── CTA FINAL ───────────── */}
        <section className="final-cta" aria-labelledby="cta-title">
          <div className="container final-cta-inner reveal">
            <h2 id="cta-title">Bora treinar?</h2>
            <p>Agende sua aula experimental e conheça a Dias Mais Fitness pessoalmente.</p>
            <div className="final-actions">
              <a className="btn btn-dark btn-lg" href={whatsappLink(messages.trial)} {...external}>
                <WhatsAppIcon size={20} /> Agendar pelo WhatsApp
              </a>
              <a className="btn btn-outline-dark btn-lg" href="#planos">
                Ver planos <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── RODAPÉ ───────────── */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#inicio" aria-label="Dias Mais Fitness, voltar ao início">
              <img src="/images/logo-dias-mais-fitness.png" alt="" width={56} height={56} loading="lazy" />
              <span className="brand-name">
                Dias Mais <b>Fitness</b>
              </span>
            </a>
            <p>Musculação, lutas e aulas coletivas no Jaguaribe, em Osasco.</p>
          </div>
          <nav className="footer-col" aria-label="Rodapé">
            <strong>Navegação</strong>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-col">
            <strong>Contato</strong>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={mapsDirectionsUrl} {...external}>
              {contact.addressLine1}
              <br />
              {contact.addressLine2}
            </a>
          </div>
          <div className="footer-col">
            <strong>Redes</strong>
            <div className="social-row">
              <a href={whatsappLink()} {...external} aria-label="WhatsApp (abre em nova aba)">
                <WhatsAppIcon size={20} />
              </a>
              <a href={contact.instagram} {...external} aria-label="Instagram (abre em nova aba)">
                <InstagramIcon size={20} />
              </a>
              <a href={contact.facebook} {...external} aria-label="Facebook (abre em nova aba)">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>
          <small className="footer-legal">
            © {new Date().getFullYear()} {contact.name}. Todos os direitos reservados. Algumas imagens são ilustrativas.
          </small>
        </div>
      </footer>

      {/* ───────────── CONTATO FLUTUANTE ───────────── */}
      <div className="floating-contact" role="group" aria-label="Contato rápido">
        <a className="float-instagram" href={contact.instagram} {...external} aria-label="Instagram da Dias Mais Fitness (abre em nova aba)">
          <InstagramIcon size={22} />
          <span className="float-label">Instagram</span>
        </a>
        <a className="float-whatsapp" href={whatsappLink()} {...external} aria-label="Conversar com a Dias Mais Fitness no WhatsApp (abre em nova aba)">
          <WhatsAppIcon size={28} />
          <span className="float-label">Chamar no WhatsApp</span>
        </a>
      </div>
    </>
  )
}
