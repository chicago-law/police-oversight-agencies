import { DefaultSeoProps } from 'next-seo'

const description = 'Interactive database of information on the civilian agencies and boards that perform oversight of police and law enforcement in the United States, with functions including adjudicate, advise, appeal, audit, investigate, review, and supervise.'
const url = 'https://policeoversight.uchicago.edu'

const seoConfig: DefaultSeoProps = {
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url,
    title: 'Police Oversight Agencies in the 100 Largest US Cities',
    description,
    images: [{
      url: '/static/agencies-map.png',
    }],
  },
}

export default seoConfig
