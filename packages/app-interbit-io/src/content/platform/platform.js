import constants from '../../constants'

import iconChainJoin from '../../assets/icons/iconChainJoin.svg'
import iconDollar from '../../assets/icons/iconDollar.svg'
import iconForbes from '../../assets/icons/iconForbes.svg'
import iconManyChains from '../../assets/icons/iconManyChains.svg'
import iconPlus from '../../assets/icons/iconPlus.svg'
import iconResiliency from '../../assets/icons/iconResiliency.svg'
import iconUsers from '../../assets/icons/iconUsers.svg'

import platformCardScale from '../../assets/pagePlatform/platformCardScale.svg'
import platformCardSpeed from '../../assets/pagePlatform/platformCardSpeed.svg'
import platformCardPrivacy from '../../assets/pagePlatform/platformCardPrivacy.svg'
import platformCardDev from '../../assets/pagePlatform/platformCardDev.svg'
import platformLogoBP from '../../assets/pagePlatform/platformLogoBP.svg'
import platformLogoEni from '../../assets/pagePlatform/platformLogoEni.png'
import platformLogoVisa from '../../assets/pagePlatform/platformLogoVisa.svg'
import platformLogoTotal from '../../assets/pagePlatform/platformLogoTotal.svg'
import platformLogoGazprom from '../../assets/pagePlatform/platformLogoGazprom.svg'
import platformLogoVattenfall from '../../assets/pagePlatform/platformLogoVattenfall.svg'
import platformLogoHowyl from '../../assets/pagePlatform/platformLogoHowyl.png'
import platformLogoMercuria from '../../assets/pagePlatform/platformLogoMercuria.png'
import platformAppCore from '../../assets/pagePlatform/platformAppCore.jpg'
import platformPatentPending from '../../assets/pagePlatform/platformPatentPending.svg'
import platformPatentPrivacy from '../../assets/pagePlatform/platformPatentPrivacy.png'
import platformPatentScale from '../../assets/pagePlatform/platformPatentScale.png'

export default {
  title: 'Focus on your product, not your infrastructure',

  intro: {
    content:
      'Interbit provides easy-to-integrate, modular application services built on our next generation blockchain to help you build better apps, faster.',
    cards: [
      {
        title: 'Users first',
        content:
          'Spend more time focusing on solutions for your users and less time building the underlying services.',
        image: iconUsers,
        className: 'sm'
      },
      {
        title: 'Resilient infrastructure',
        content:
          'Blockchain provides resilient infrastructure, data and app integrity, and redundancy by default.',
        image: iconResiliency,
        className: 'sm'
      },
      {
        title: 'Approachable app development',
        content:
          'Developers can use JavaScript and get started with little-to-no additional training. Build and maintain apps easier than ever.',
        image: iconPlus,
        className: 'sm'
      },
      {
        title: 'Commercialize your app on Interbit',
        content:
          'End to end support for application development, promotion and sales (coming soon).',
        image: iconDollar,
        className: 'sm'
      }
    ]
  },

  quote: {
    content:
      'BTL’s architecture is like no other I’ve seen, and it is the only one that succinctly deals with the GDPR ‘right to be forgotten’ requirement: to forget a user, simply delete their blockchains.',
    author: 'Jason Bloomberg, Forbes',
    image: iconForbes,
    callToActions: [
      {
        to:
          'https://www-forbes-com.cdn.ampproject.org/c/s/www.forbes.com/sites/jasonbloomberg/2018/05/17/massive-consensus-conference-succumbs-to-blockchain-echo-chamber/amp/',
        text: 'See the article on forbes.com'
      }
    ]
  },

  takeAdvantage: {
    title:
      'Take advantage of blockchain capabilities and focus on building apps',
    content: `Development on Interbit is limited to the effort required to develop the core business logic and user interface for the application.

The platform provides redundancy, persistence, networking, and satisfies audit requirements out of the box.`
  },

  logos: {
    title: 'Interbit is powering applications and services built for:',
    logos: [
      {
        src: platformLogoBP,
        alt: 'BP logo'
      },
      {
        src: platformLogoEni,
        alt: 'eni logo'
      },
      {
        src: platformLogoVisa,
        alt: 'Visa logo'
      },
      {
        src: platformLogoTotal,
        alt: 'Total logo'
      },
      {
        src: platformLogoGazprom,
        alt: 'Gazprom logo'
      },
      {
        src: platformLogoVattenfall,
        alt: 'Vattenfall logo'
      },
      {
        src: platformLogoHowyl,
        alt: 'Howyl logo'
      },
      {
        src: platformLogoMercuria,
        alt: 'Mercuria logo'
      }
    ]
  },

  patentPending: {
    title:
      'Interbit\u2019s patent-pending chain connecting technology frees developers from previous blockchain limits',
    content: `Explore how Interbit solves scalability, speed, privacy limitations, and makes developing blockchain applications easy for your business.

Interbit introduces many chain architectures. Many lightweight connected blockchains allow developers to horizontally scale their applications well before reaching the limits of a single blockchain.`,
    image: {
      src: platformPatentPending,
      alt: 'Patent Pending'
    },
    cards: [
      {
        title: 'Horizontal scale',
        content:
          'Keep pace with demand by adding and connecting chains that allow for parallel processing.',
        image: platformCardScale
      },
      {
        title: 'Speed is not an issue',
        content:
          'Distribute your application\u2019s workload across multiple task-specfic blockchains that allow for efficient computation.',
        image: platformCardSpeed
      },
      {
        title: 'Achieve true privacy',
        content:
          'Segregate private and sensitive data to its own chain with no metadata leakage, and maintain granular control over access.',
        image: platformCardPrivacy
      },
      {
        title: 'Easy development',
        content:
          'Build complex applications without having to understand the underlying blockchain. Start developing with our simple API in popular tools quickly.',
        image: platformCardDev
      }
    ]
  },

  metrics: {
    title: 'Patent-pending chain joining',
    content: `Unique to Interbit, chain joining solves blockchain’s scalability and privacy issues.

Applications built on single-chain solutions are not scalable to the requirements of business applications, and cannot accomodate privacy demands.

Interbit was designed so that many blockchains can be connected together into an infinite number of many chain architectures that are truly private, can scale, and are highly resilient.`,
    metricBoxes: [
      {
        title: 'Privacy through segregation',
        content: `True privacy can only be achieved when data is made completely inaccessible to others.

Control access to individual chains, and the information on each.`,
        image: platformPatentPrivacy
      },
      {
        title: 'Unlimited horizontal scale',
        content:
          'Single chain solutions have limitations. Connect as many Interbit chains as required to scale.',
        image: platformPatentScale
      }
    ]
  },

  apps: [
    {
      title: 'Core',
      content:
        'Interbit is powered by our proprietary next generation blockchain technology with unique patent-pending chain joining capabilities.',
      callToActions: [
        {
          to: constants.urls.GITHUB_IB,
          text: 'View Source for \u201CCreate Interbit App\u201D'
        }
      ],
      image: platformAppCore,
      cards: [
        {
          title: 'Chain joining',
          content:
            'Patent-pending chain joining unlocks blockchain scalabilty and true privacy.',
          image: iconChainJoin
        },
        {
          title: 'Many chain architectures',
          content:
            'Design elegant compound applications using service-orientated architecture.',
          image: iconManyChains
        }
      ]
    }
  ]
}
