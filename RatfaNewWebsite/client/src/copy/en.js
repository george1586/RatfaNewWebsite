// English copy backup — all landing page strings before Romanian rewrite.
// Components now use Romanian. This file is the reference for the original English.

export const hero = {
    headline: "The hardware your household plugs in to take its attention back.",
    body: "Block distracting apps and sites across every device in your home — TikTok, Instagram, Reddit, news, adult content — on schedules you set. One device, every screen in the house.",
};

export const productInfo = {
    label: "What is Steelgate?",
    headline: "Your household's attention layer.",
    body1: "Steelgate is a compact network device that sits between your router and your devices. It controls what every screen in your home can reach — and when.",
    body2: "It's not a parental control app your kids can uninstall. It's not a browser extension that only works on one device. It works at the network level — every phone, tablet, laptop, and smart TV in the house goes through it automatically.",
};

export const featureShowcase = {
    label: "What it does",
    headline: "Everything, network-wide.",
    features: [
        "App & Site Blocking",
        "Custom Schedules",
        "Household-Wide Coverage",
        "Ad & Tracker Blocking",
        "Adult Content Filtering",
        "Privacy Protection",
        "Firewall",
    ],
};

export const features = {
    label: "Features",
    headline: "Give your household its attention back.",
    subtitle: "One device that controls every screen in your home — without complicated setup or easy bypasses.",
    items: [
        { title: "App & Site Blocking",       desc: "Block TikTok, Instagram, Reddit, YouTube, or any site — on every device in the house, without touching each one individually." },
        { title: "Custom Schedules",          desc: "Set different rules for weekdays, weekends, homework time, and bedtime. The schedule runs itself." },
        { title: "Household-Wide Coverage",   desc: "Works on every device automatically — phones, tablets, laptops, smart TVs. No app to install on each device." },
        { title: "Ad & Tracker Blocking",     desc: "Removes ads and tracking scripts before they load, across all devices and apps. Faster pages, less noise." },
        { title: "Adult Content Filtering",   desc: "Block categories of content network-wide without configuring each device separately." },
        { title: "Dopamine Detox Mode",       desc: "Disable short-form video feeds while keeping messaging and other functions of a platform intact." },
        { title: "Real-Time Threat Blocking", desc: "Known phishing domains, malware endpoints, and suspicious traffic are blocked before a device ever loads them." },
        { title: "Privacy Protection",        desc: "Your traffic stays on your network. No data leaves your home and your ISP can't see what you're browsing." },
        { title: "Easy To Set Up",            desc: "Connect it to your network. That's it. No router config, no IT knowledge needed." },
        { title: "Easy To Manage",            desc: "A simple local dashboard lets you adjust rules, check activity, and whitelist anything that gets blocked incorrectly." },
    ],
};

export const scenarios = {
    label: "In practice",
    headline: "Unlike anything you've tried before.",
};

export const faq = {
    label: "FAQ",
    headline: "Questions worth asking.",
    items: [
        { q: "When will Steelgate ship?",                              a: "We're targeting Q4 2026. Ordering now locks in your founding price and reserves your spot. We'll keep you updated as production progresses — you'll hear from us before anyone else." },
        { q: "What if I change my mind? Can I cancel my order?",       a: "Yes. Your €45 order payment is fully refundable before we ship. Just email us and we'll process the refund within a few days. No questions asked." },
        { q: "Why should I order instead of waiting for the full launch?", a: "Founding customers get Steelgate at €45 — permanently lower than the launch price. Ordering is the only way to lock in the founding rate." },
        { q: "Why is the founding price lower? What's the catch?",     a: "There's no catch. We're offering a lower price to the people who believe in Steelgate early — before we've shipped a single unit. That trust helps us validate demand and fund production. In return, you get a permanently lower rate and priority shipping." },
        { q: "What happens if you don't reach 100 orders?",            a: "If we don't hit the minimum needed to move to production, every order will be fully refunded. You won't lose anything." },
        { q: "How is Steelgate different from a parental control app or Pi-hole?", a: "Parental control apps only work on the device they're installed on — and your kids can delete them. Pi-hole blocks ads at the DNS level but requires technical setup and doesn't handle scheduling or app-specific blocking. Steelgate sits between your router and your devices, which means it works on every screen in the house automatically — including phones, tablets, laptops, and smart TVs — with no app to install on each device." },
        { q: "Will this slow down my internet or affect streaming and gaming?", a: "No. Steelgate processes traffic locally and is built to add minimal latency. In practice, pages often load faster because ads and tracking scripts are removed before they reach your devices. If something gets blocked that shouldn't be, you can whitelist it instantly." },
        { q: "How does Steelgate protect my privacy? Do you see my traffic?", a: "Steelgate runs entirely on your local network. Filtering decisions happen on-device, not in the cloud. We don't collect or store your browsing data — your traffic stays inside your home." },
        { q: "Is it really plug-and-play, or do I need to configure my router?", a: "It's designed to be as close to plug-and-play as possible. In most setups, you just connect it to your network and it starts working. Advanced users can fine-tune rules, but the default experience is built for people who don't want to touch their router config." },
        { q: "Who is Steelgate for?",                                  a: "Steelgate is for households that want real control over screen time and digital habits — without fighting each device individually, setting up complicated software, or relying on restrictions that are easy to bypass. If you have kids, or you're trying to break your own phone habits, this is built for you." },
    ],
};

export const cta = {
    headline: "Tech's best features are the ones you choose.",
    body: "Order Steelgate today and take back control of every screen in your home.",
};

export const footer = {
    tagline: "Giving every household control over its own attention.",
    links: {
        Product: [["Features", "/#features"], ["Order", "/products"], ["FAQ", "/faq"]],
        Company: [["About", "/story"], ["Contact", "mailto:hello@steelgate.io"]],
        Legal:   [["Privacy", "/privacy"], ["Terms", "/terms"]],
    },
    copyright: `© ${new Date().getFullYear()} Steelgate. All rights reserved.`,
};

export const seo = {
    title: "Steelgate — Take Your Household's Attention Back",
    description: "Steelgate is a plug-in hardware device that blocks distracting apps and sites across every device in your home — TikTok, Instagram, Reddit — on schedules you set. One device, every screen.",
};
