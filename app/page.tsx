import Hero from '@/components/Hero/Hero'
import QuickFacts from '@/components/QuickFacts/QuickFacts'
import Categories from '@/components/Categories/Categories'
import WhyUs from '@/components/WhyUs/WhyUs'
import CTABanner from '@/components/CTABanner/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <Categories />
      <WhyUs />
      <CTABanner />
    </>
  )
}
