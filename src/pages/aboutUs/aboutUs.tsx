import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ST from './aboutUs.module.scss';
import LEILA from '../../../assets/img/team/leila.png';
import SONIA from '../../../assets/img/team/sonia.png';
import KARIMA from '../../../assets/img/team/karima.png';
import KARIMAR from '../../../assets/img/team/karima-r.png';
import AYA from '../../../assets/img/team/aya.png';
import GHIZLANE from '../../../assets/img/team/ghizlane.png';
import NARJIS from '../../../assets/img/team/narjis.jpeg';
import OUTLAWS from '../../../assets/img/outlaw.png';
const AboutUs = () => {
  const [tab, setTab] = useState('outlaws');
  return (
    <div className={ST.container}>
      <div className={ST.heading}>à propos de nous</div>
      <Tabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        textColor='primary'
        indicatorColor='primary'
        className={ST.tabs}
      >
        <Tab value='outlaws' label='COLLECTIF 490' />
        <Tab value='manifest' label='Le manifeste' />
        <Tab value='team' label="L'équipe" />
      </Tabs>
      <div className={ST.tabsContent}>
        {tab === 'outlaws' && (
          <div>
            <p>
              <u>
                <strong>PRESENTATION DU COLLECTIF 490</strong>
              </u>
            </p>
            <p>
              Le Collectif 490 s&rsquo;est cr&eacute;&eacute; au lendemain de
              l&rsquo;arrestation de la journaliste Hajar Raissouni pour &laquo;
              avortement ill&eacute;gal &raquo; et &laquo; relations sexuelles
              hors mariage &raquo;, &agrave; la fin de l&rsquo;&eacute;t&eacute;
              2019. Nous avons mobilis&eacute; des milliers personnes autour
              d&rsquo;un manifeste intitul&eacute; le &laquo; Manifeste des 490
              &raquo; en r&eacute;f&eacute;rence &agrave; l&rsquo;article 490 du
              Code p&eacute;nal marocain qui punit les relations sexuelles hors
              mariage, r&eacute;dig&eacute; par Leila Slimani et Sonia Terrab et
              qui d&eacute;bute ainsi : &laquo; Nous, citoyennes et citoyens
              marocains, d&eacute;clarons que nous sommes hors-la-loi &raquo;.
            </p>
            <p>
              Hajar a retrouv&eacute; sa libert&eacute; depuis, au
              b&eacute;n&eacute;fice d&rsquo;une gr&acirc;ce royale salutaire
              qui a insuffl&eacute; une vague d&rsquo;espoir dans le pays. Mais
              le Maroc reste rempli d&rsquo;autres Hajar&hellip; Et un mouvement
              est n&eacute;, port&eacute; par Narjis Benazzou, Karima Nadir,
              Ghizlane Mamouni, Karima Rochdi et toutes celles et ceux qui ont
              fait un bout de chemin avec nous ou qui nous ont rejoints. Pour
              nous, c&rsquo;est le d&eacute;but du combat vers un objectif
              simple, changer la loi pour&nbsp;:
            </p>
            <p>
              -Abroger les articles du Code p&eacute;nal qui sanctionnent de
              prison des faits relevant de l&rsquo;exercice de libert&eacute;s
              individuelles et prot&eacute;g&eacute;s par le principe
              constitutionnel de droit &agrave; la vie priv&eacute;&nbsp;:
              relations sexuelles hors mariage, interruption volontaire de
              grossesse, homosexualit&eacute; ; et
            </p>
            <p>
              -Encadrer le droit &agrave; l&rsquo;avortement selon les
              pr&eacute;conisations de l&rsquo;Organisation Mondiale de la
              Sant&eacute; (OMS).
            </p>
            <p>
              Depuis, nous n&rsquo;avons de cesse de nous activer, avec pour
              outils, les r&eacute;seaux sociaux et pour force notre
              communaut&eacute;, pour ouvrir un grand d&eacute;bat national afin
              de changer ces lois h&eacute;rit&eacute;es du protectorat et dont
              les marocains les plus fragiles subissent encore au quotidien, les
              humiliations, les pressions et les extorsions qui en
              d&eacute;coulent&hellip;
            </p>
            <p>
              Notre mot d&rsquo;ordre : &laquo; toutes et tous hors-la-loi
              jusqu&rsquo;&agrave; ce que la loi change&nbsp;!&nbsp;&raquo;.
            </p>
          </div>
        )}
        {tab === 'manifest' && (
          <div>
            <p>
              <u>
                <strong
                  style={{
                    textTransform: 'uppercase',
                  }}
                >
                  Manifeste des Hors-la-loi&nbsp;
                </strong>
              </u>
            </p>
            <p>
              Nous, citoyennes et citoyens marocains, d&eacute;clarons que nous
              sommes hors-la-loi.
            </p>
            <p>
              Nous violons des lois injustes, obsol&egrave;tes, qui n&rsquo;ont
              plus lieu d&rsquo;&ecirc;tre.
            </p>
            <p>Nous avons eu des relations sexuelles hors mariage.</p>
            <p>
              Nous avons subi, pratiqu&eacute; ou &eacute;t&eacute; complices
              d&rsquo;un avortement.
            </p>
            <p>
              Nous avons appris &agrave; feindre, &agrave; composer, &agrave;
              faire semblant. Pour combien de temps encore ?
            </p>
            <p>
              Chaque jour, chaque heure, en secret, en cachette, des femmes
              comme moi, des hommes comme toi, conservateurs ou progressistes,
              personnalit&eacute;s publiques ou anonymes, de tous les milieux et
              toutes les r&eacute;gions, osent et s&rsquo;assument, jouissent et
              existent par eux-m&ecirc;mes, brisent des cha&icirc;nes et
              bafouent des lois. Parce qu&rsquo;ils aiment.
            </p>
            <p>
              Chaque jour, je me rends coupable d&rsquo;aimer et
              d&rsquo;&ecirc;tre aim&eacute;. Chaque fois qu&rsquo;une femme est
              arr&ecirc;t&eacute;e, je me rends complice. Je me dis : &ccedil;a
              aurait pu &ecirc;tre moi...&nbsp;
            </p>
            <p>
              Puis je me tais, je passe mon chemin, je m&rsquo;efforce
              d&rsquo;oublier...
            </p>
            <p>
              Mais je n&rsquo;y arrive plus. Je n&rsquo;en peux plus. Car mon
              corps m&rsquo;appartient, il n&rsquo;appartient ni &agrave; mon
              p&egrave;re, ni &agrave; mon mari, ni &agrave; mon entourage, ni
              aux yeux des hommes dans la rue, et encore moins &agrave;
              l&rsquo;Etat.
            </p>
            <p>
              Aujourd'hui, je ne veux plus avoir honte. Moi qui aime, avorte, ai
              des relations sexuelles sans &ecirc;tre mari&eacute;e. Moi qui me
              cache. Moi qui risque le d&eacute;shonneur, l&rsquo;infamie, la
              prison.
            </p>
            <p>
              Cette culture du mensonge et de l&rsquo;hypocrisie sociale
              g&eacute;n&egrave;re la violence, l&rsquo;arbitraire,
              l&rsquo;intol&eacute;rance. Ces lois, liberticides et
              inapplicables, sont devenues des outils de vengeance politique ou
              personnelle. C&rsquo;est une &eacute;p&eacute;e de Damocl&egrave;s
              qui nous menace et nous rappelle que notre vie ne nous appartient
              pas. Comment l&rsquo;accepter ? Pourquoi l&rsquo;accepter ? Encore
              et encore&hellip;
            </p>
            <p>
              En 2018, au Maroc, 14 503 personnes ont &eacute;t&eacute;
              poursuivies au regard de l&rsquo;article 490 du Code P&eacute;nal,
              qui punit de prison les relations sexuelles hors des liens du
              mariage. 3048 personnes ont &eacute;t&eacute;
              incarc&eacute;r&eacute;es pour adult&egrave;re. Chaque jour, dans
              notre pays, entre 600 et 800 avortements clandestins sont
              pratiqu&eacute;s.
            </p>
            <p>
              Faut-il mettre toutes ces personnes en prison ? Leurs &laquo;
              complices &raquo; (m&eacute;decins, militants associatifs) aussi ?
            </p>
            <p>
              Nous croyons que la soci&eacute;t&eacute; marocaine est m&ucirc;re
              pour le changement et pour que soient enfin
              ent&eacute;rin&eacute;s le respect de la vie priv&eacute;e et le
              droit de chacun &agrave; disposer de son corps. Notre
              soci&eacute;t&eacute; et notre pays m&eacute;ritent cela. Nous
              appelons nos gouvernants, nos d&eacute;cideurs, nos
              l&eacute;gislateurs, &agrave; faire preuve de courage, &agrave;
              faire ce pas en avant, en engageant un d&eacute;bat national sur
              les libert&eacute;s individuelles.
            </p>
            <p>
              Ce n&rsquo;est pas un luxe, ce n&rsquo;est pas une faveur,
              c&rsquo;est une n&eacute;cessit&eacute;.
            </p>
            <p>
              Comment favoriser l&rsquo;&eacute;panouissement de la jeunesse,
              comment permettre la juste implication des femmes dans la
              soci&eacute;t&eacute;, comment engager r&eacute;ellement notre
              pays dans le progr&egrave;s, dans le d&eacute;veloppement humain,
              si nos libert&eacute;s individuelles ne sont pas
              respect&eacute;es, si notre dignit&eacute; est foul&eacute;e au
              pied, si nous restons toutes et tous hors-la-loi ?
            </p>
            <p>
              Toutes et tous hors la loi, jusqu&rsquo;&agrave; ce que la loi
              change.
            </p>
          </div>
        )}
        {tab === 'team' && (
          <div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={SONIA} alt='Sonia TERRAB' />
                <div className={ST.label}>Sonia TERRAB</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Sonia&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                Sonia Terrab a d&rsquo;abord &eacute;t&eacute; journaliste, puis
                &eacute;crivaine (elle est l'auteure de deux romans) avant de
                devenir r&eacute;alisatrice. Elle a r&eacute;alis&eacute;
                plusieurs documentaires, dont &ldquo;Shakespeare &agrave;
                Casablanca&rdquo; en 2016 et &ldquo;L7sla&rdquo;
                (L&rsquo;impasse) en 2020, ainsi que la web s&eacute;rie
                documentaire &ldquo;Marokkiat&rdquo; (Marocaines) en 2017, qui
                donne la parole &agrave; des femmes dans l&rsquo;espace public
                pour raconter &agrave; visage d&eacute;couvert leur v&eacute;cu,
                brisant ainsi de multiples tabous. Elle a aussi
                r&eacute;alis&eacute; deux campagnes pour l&rsquo;ONU Femmes
                &laquo;Because I&rsquo;m a man&raquo; sur les
                masculinit&eacute;s positives au Maroc.
              </p>
              <p>
                Dans son travail, elle repousse r&eacute;guli&egrave;rement les
                lignes, lib&egrave;re la parole d&rsquo;une jeunesse
                marginalis&eacute;e, et attire l&rsquo;attention sur les
                probl&egrave;mes de genre et les in&eacute;galit&eacute;s
                sociales. Sonia Terrab est aussi devenue militante en 2019,
                quand elle a fond&eacute;, avec Leila Slimani, Moroccan Outlaws.
                Elle s&rsquo;occupe aujourd&rsquo;hui de la strat&eacute;gie
                digitale et globale du mouvement.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                J&rsquo;ai initi&eacute;, avec Leila Slimani, le &laquo;&nbsp;
                <strong>Manifeste des Hors-la-loi</strong> &raquo; en faveur de
                la d&eacute;p&eacute;nalisation des libert&eacute;s
                individuelles au Maroc au lendemain de l&rsquo;arrestation de la
                journaliste Hajar Raissouni (qui a, par la suite,
                b&eacute;n&eacute;ficier d&rsquo;une gr&acirc;ce royale) pour
                avortement et relations sexuelles hors mariage, afin
                d&rsquo;exprimer le ras-le-bol des femmes marocaines
                d&rsquo;&ecirc;tre d&eacute;poss&eacute;d&eacute;es du droit de
                disposer de leurs corps. Je ne m&rsquo;imaginais pas, au
                d&eacute;but, qu&rsquo;autant de femmes et de jeunes se
                sentiraient concern&eacute;s et r&eacute;pondraient avec autant
                de force &agrave; notre appel. Nous poursuivons depuis le combat
                avec Narjis, Karima N., Ghizlane, Karima R. et toutes celles et
                ceux qui nous aident au quotidien, car l&rsquo;article 490 et
                les autres articles liberticides du code p&eacute;nal continuent
                de briser des vies, d&rsquo;enfermer derri&egrave;re les
                barreaux des prison et les murs du silence des femmes victime,
                de les condamner &agrave; la double peine.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={LEILA} alt='LEILA SLIMANI' />
                <div className={ST.label}>Leila SLIMANI</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Leila&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                N&eacute;e en 1981 &agrave; Rabat (Maroc), Le&iuml;la Slimani
                s&rsquo;installe en France en 1999 pour &eacute;tudier la
                litt&eacute;rature et les sciences politiques. En 2014 elle
                publie son premier roman, Dans le jardin de l&rsquo;ogre
                (Gallimard). En 2016, son roman Chanson douce (Gallimard)
                obtient le prix Goncourt. Journaliste de formation, longtemps
                &agrave; Jeune Afrique, elle publie en 2017 un essai sur le
                Maroc, Sexe et mensonges (Ar&egrave;nes) ainsi qu&rsquo;un roman
                graphique, Paroles d&rsquo;honneur (Ar&egrave;nes). En 2020
                para&icirc;t Le pays des autres (Gallimard) premier tome
                d&rsquo;une saga annonc&eacute;e. Elle est, depuis 2017, la
                repr&eacute;sentante personnelle du Pr&eacute;sident de la
                R&eacute;publique pour la francophonie.
              </p>
              <p>
                Le&iuml;la porte la voix du Collectif et le fait rayonner,
                surtout &agrave; l&rsquo;international.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                J&rsquo;ai initi&eacute;, avec Sonia Terrab, le &laquo;&nbsp;
                <strong>Manifeste des Hors-la-loi</strong> &raquo; par
                engagement en faveur des libert&eacute;s individuelles. Cet
                engagement prend racine dans mes convictions f&eacute;ministes
                qui veulent que chaque citoyenne puisse librement disposer de
                son corps et ait droit &agrave; une intimit&eacute;. Ainsi, nous
                d&eacute;fendons le droit &agrave; l&rsquo;avortement et
                l&rsquo;abrogation des lois p&eacute;nalisant la
                sexualit&eacute;, l&rsquo;adult&egrave;re et
                l&rsquo;homosexualit&eacute;, &agrave; travers
                l&rsquo;information, le relais de la parole des femmes mais
                aussi de la communaut&eacute; LGBT+ qui sont encore trop
                invisibilis&eacute;e et en nous inscrivant ainsi dans ce grand
                mouvement d&rsquo;&eacute;mancipation mondiale des femmes et
                minorit&eacute;s sexuelles.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={KARIMA} alt='Karima NADIR' />
                <div className={ST.label}>Karima NADIR</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Karima&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                Karima est une communicante engag&eacute;e. Son excellente
                ma&icirc;trise de la langue arabe fait d&rsquo;elle la
                porte-parole du Collectif sur les m&eacute;dias en langue arabe
                o&ugrave; elle se distingue par son aisance de communication et
                la virulence de ses propos.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                J&rsquo;ai assist&eacute; aux premi&egrave;res heures de la
                cr&eacute;ation de Moroccan Outlaws, notamment en traduisant le
                manifeste vers l&rsquo;arabe et la darija. je pense
                fondamentalement qu&rsquo;on ne peu pas faire avancer une
                soci&eacute;t&eacute; sans lib&eacute;rer ses individus.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={NARJIS} alt='Narjis BENAZZOU' />
                <div className={ST.label}>Narjis BENAZZOU</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Narjs</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                Narjis est m&eacute;decin sp&eacute;cialis&eacute;e en biologie
                m&eacute;dicale. Dans son laboratoire, elle chapeaute une
                &eacute;quipe de jeunes femmes dynamiques et consciencieuses. En
                plus de sa formation scientifique, son parcours &agrave;
                l'h&ocirc;pital public lui a permis de se rapprocher des couches
                sociales les plus fragiles et de prendre conscience de leur
                d&eacute;tresse, en particulier celle des femmes et des enfants.
              </p>
              <p>
                Narjis est la cheville ouvri&egrave;re du Collectif. Son esprit
                scientifique et son organisation millim&eacute;trique sont un
                grand atout pour le Collectif qui peut compter sur elle pour
                organiser, piloter et suivre chacune des actions du Collectif.
                C&rsquo;est la raison pour laquelle elle a &eacute;t&eacute;
                choisie comme Pr&eacute;sidente du Collectif 490.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                J'ai rejoint le mouvement Morrocan Outlaws d&egrave;s que j'ai
                appris son existence sans vraiment me poser de questions. Mon
                pays a besoin de femmes et d'hommes courageux, qui sont &agrave;
                l'&eacute;coute sans juger et qui contribueront, j'en suis
                s&ucirc;re, &agrave; ce que les jeunes g&eacute;n&eacute;rations
                puissent enfin jouir de leurs libert&eacute;s compl&egrave;tes
                sans avoir peur ni honte.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={GHIZLANE} alt='Ghizlane MAMOUNI' />
                <div className={ST.label}>Ghizlane MAMOUNI</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Ghizlane&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                Avocate au barreau de Paris, dipl&ocirc;m&eacute;e de la
                Sorbonne, Ghizlane exerce depuis 2010 en tant qu&rsquo;avocate
                d&rsquo;affaires sp&eacute;cialis&eacute;e en droit bancaire et
                financier. Apr&egrave;s plusieurs ann&eacute;es &agrave; Paris,
                elle retourne au Maroc o&ugrave; elle dirige le
                d&eacute;partement banque-finance d&rsquo;un cabinet
                d&rsquo;avocats international de renom avant de fonder, en 2015,
                son propre cabinet ind&eacute;pendant.
              </p>
              <p>
                Au sein du Collectif, Ghizlane est force de proposition et
                d&rsquo;action. C&rsquo;est elle aussi qui veille &agrave; ce
                que nos actions soient encadr&eacute;es juridiquement.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                En tant que juriste, je me pose naturellement la question de la
                place de la r&egrave;gle de droit dans les changements
                soci&eacute;taux&nbsp;: le droit doit-il se limiter &agrave;
                accompagner le changement ou doit-il le pr&eacute;c&eacute;der
                et ainsi favoriser sa r&eacute;alisation&nbsp;? En
                r&eacute;alit&eacute;, le droit peut faire les deux et, en cela,
                c&rsquo;est un levier incroyable.
              </p>
              <p>
                Aujourd&rsquo;hui, il est absolument n&eacute;cessaire de
                changer la loi au Maroc pour que plus jamais les femmes
                marocaines ne puissent &ecirc;tre pers&eacute;cut&eacute;es,
                jug&eacute;es et condamn&eacute;es &agrave; la prison pour des
                faits soit dont elles sont elles-m&ecirc;mes les victimes
                directes, soit qui rel&egrave;vent de l&rsquo;exercice de leurs
                libert&eacute;s fondamentales. Et pour y arriver, utiliser tous
                les outils de droit possibles, notamment ceux offerts par la
                constitution de 2011 et presque jamais utilis&eacute;s
                auparavant.
              </p>
              <p>
                J&rsquo;ai rejoint le Collectif de fa&ccedil;on &eacute;vidente
                car, en plus de la justesse de leur approche, j&rsquo;ai
                &eacute;t&eacute; s&eacute;duite par le sens profond de la
                libert&eacute; qui est partag&eacute; par ses membres et par la
                simplicit&eacute; et la percussion du message&nbsp;: nous
                demandons d&rsquo;abroger l&rsquo;ensemble des articles
                liberticides et discriminants du code p&eacute;nal marocain (en
                t&ecirc;te desquels le 490) qui pr&eacute;voient des peines
                privatives de libert&eacute; pour des faits relevant du droit,
                constitutionnel, &agrave; la protection de la vie priv&eacute;e.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={KARIMAR} alt='Karima ROCHDI' />
                <div className={ST.label}>Karima ROCHDI</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Karima R.&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                Journaliste depuis 25 ans, laur&eacute;ate de l'institut
                sup&eacute;rieur de l'information et de la communication (ISIC)
                de Rabat., Karima a travaill&eacute; dans la presse
                f&eacute;minine marocaine et a &eacute;t&eacute; la
                co-fondatrice du magazine Besma (groupe Le Matin). Elle est
                aujourd&rsquo;hui &eacute;galement co-fondatrice du magazine
                womeninbusiness.ma d&eacute;di&eacute; &agrave;
                l&rsquo;entreprenariat f&eacute;minin et aux femmes leader et
                co-g&eacute;rante d'une agence de communication et
                d'&eacute;v&eacute;nementiel.
              </p>
              <p>
                Au quotidien, Karima assure les relations publiques et les
                relations presse du Collectif. Gr&acirc;ce &agrave; son
                m&eacute;tier et son exp&eacute;rience, ses conseils de
                r&eacute;daction et de communication sont toujours
                pr&eacute;cieux.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                La situation des femmes au Maroc m&rsquo;interpelle, dans tous
                ses aspects&nbsp;: des petites filles non scolaris&eacute;es
                &agrave; la minorit&eacute; des femmes dans la politique en
                passant l'acc&egrave;s aux postes de
                responsabilit&eacute;s&hellip; J&rsquo;ai adh&eacute;r&eacute;
                au mouvement des hors-la-loi depuis sa cr&eacute;ation car
                j&rsquo;ai l&rsquo;espoir qu&rsquo;il permettra aux jeunes de
                d&eacute;fendre leurs libert&eacute;s, leurs diff&eacute;rences
                et avoir leur place dans une soci&eacute;t&eacute; qui a peur
                d'assumer la diff&eacute;rence de ses propres citoyens et les
                met &agrave; la marge.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={AYA} alt='Aya KARIM' />
                <div className={ST.label}>Aya KARIM</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Aya&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                Aya est une jeune femme de 22 ans dipl&ocirc;m&eacute;e en
                Sciences Politiques et ayant suivi des formations en
                Communication Campaign/Media assur&eacute;es par la Fondation
                Thomson Reuters. Elle a depuis son tr&egrave;s jeune &acirc;ge
                rejoint la soci&eacute;t&eacute; civile en tant que
                f&eacute;ministe panafricaine et activiste pour les droits des
                SGM en plus d&rsquo;avoir travaill&eacute; dans le consulting
                social.
              </p>
              <p>
                Aya s&rsquo;int&eacute;resse essentiellement aux questions
                relatives aux droits humains et &agrave; la participation active
                des jeunes en politique ainsi que leur implication dans le
                travail associatif. Elle est d&rsquo;ailleurs Ministre&nbsp;de
                la&nbsp;Solidarit&eacute;, du&nbsp;D&eacute;veloppement Social,
                de l'&Eacute;galit&eacute; et de la Famille aupr&egrave;s du
                Gouvernement Parall&egrave;le des Jeunes dans la r&eacute;gion
                Rabat-Sal&eacute;-Kenitra.
              </p>
              <p>
                &nbsp;
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                J&rsquo;ai rejoint le Collectif 490 parce que je suis une jeune
                femme marocaine qui a envie de se faire entendre et qui veut
                faire changer les choses. Le travail des Moroccan Outlaws est un
                r&eacute;el vecteur de changement qui apporte des remaniements
                probants sur le plan societal et l&eacute;gislatif. Pour moi,
                aucun autre organisme marocain ne repr&eacute;sente mieux la
                jeunesse marocaine et notre soif de libert&eacute;. Faire partie
                de l&rsquo;&eacute;quipe m&rsquo;a appris la r&eacute;silience
                et la force. &Ecirc;tre une hors-la-loi ne consiste pas
                seulement &agrave; oser contester la loi, il s'agit de surmonter
                les contraintes structurelles des libert&eacute;s individuelles
                &agrave; l'aide d'instruments l&eacute;gislatifs.
              </p>
              <p>
                Voir ce mouvement in&eacute;dit militer publiquement pour la
                libert&eacute; sexuelle et &agrave; la r&eacute;forme des lois
                draconiennes restreignant les libert&eacute;s, obtenir le
                soutien de milliers de marocain.e.s me donne constamment de
                l'espoir. L&rsquo;espoir d&rsquo;un Maroc pluriel,
                tol&eacute;rant et &eacute;galitaire. Mon r&ecirc;ve de vivre
                dans un pays qui donne &agrave; tou.te.s ses citoyen.ne.s la
                possibilit&eacute; de s'&eacute;panouir et de vivre dans la
                dignit&eacute; se concr&eacute;tise chaque jour gr&acirc;ce au
                combat men&eacute; par les Outlaws.
              </p>
            </div>
            <div className={ST.teamMember}>
              <div className={ST.name}>
                <img src={OUTLAWS} alt='Manar SEDKI' />
                <div className={ST.label}>Manar SEDKI</div>
              </div>
              <p>
                <u>
                  <strong>
                    <em>Qui est Manar&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>Manar a 20 ans. C&rsquo;est notre plus jeune membre active.</p>
              <p>
                Manar est une jeune femme d&eacute;termin&eacute;e et
                travailleuse qui jongle entre ses &eacute;tudes, ses stages et
                son travail b&eacute;n&eacute;vole avec le Collectif.
              </p>
              <p>
                Au Collectif 490, Manar nous aide &agrave; g&eacute;rer les
                comptes sur les r&eacute;seaux sociaux, cr&eacute;er du contenu
                et faciliter la sensibilisation afin de partager des
                informations &agrave; la communaut&eacute;.
              </p>
              <p>
                <u>
                  <strong>
                    <em>
                      Qu&rsquo;est-ce qui t&rsquo;as pouss&eacute;e &agrave;
                      rejoindre{' '}
                    </em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em>Moroccan</em>
                  </strong>
                </u>
                <u>
                  <strong>
                    <em> Outlaws&nbsp;?</em>
                  </strong>
                </u>
              </p>
              <p>
                J'ai int&eacute;gr&eacute; le Collectif490 parce que je crois
                que les droits et libert&eacute;s fondamentales doivent
                &ecirc;tre garanties et prot&eacute;g&eacute;es pour tous.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AboutUs;
