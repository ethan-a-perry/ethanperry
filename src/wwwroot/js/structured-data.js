import siteData from "../../data/site-data.json";
import { formatDateYYYYMMDD } from "./utils.js";

const include = [
    "/",
    "/about",
    "/contact",
    "/work",
    "/writings",
]

const personId = `${siteData.domain}/#/schema/person`;
const websiteId = `${siteData.domain}/#/schema/website`;

const baseSchemas = {
    person: {
        "@type": "Person",
        "@id": personId,
        "name": siteData.name,
        "url": siteData.domain,
        "sameAs": [
            "https://www.linkedin.com/in/perry-ethan",
            "https://github.com/perry-ethan",
            "https://goodreads.com/ethanperry"
        ]
    },
    website: {
        "@type": "WebSite",
        "@id": websiteId,
        "name": "Ethan Perry",
        "description": "Portfolio website",
        "url": siteData.domain,
        "logo": `${siteData.domain}/assets/icons/logo.svg`,
        "publisher": {
            "@type": "Person",
            "@id": personId,
        },
    }
}

function getCreativeWorkSchema(canonicalURL, title, description, image, metadata) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CreativeWork",
                "name": title,
                "description": description,
                "url": canonicalURL,
                "author": {
                    "@type": "Person",
                    "name": personId
                },
                ...(metadata?.datePublished ? {"datePublished": formatDateYYYYMMDD(metadata.datePublished)} : {}),
                ...(metadata.dateUpdated ? {"dateModified": formatDateYYYYMMDD(metadata.dateUpdated)} : {}),
                ...(image ? { "image": `${siteData.domain}${image.src}` } : {})
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Work",
                    "item": `${siteData.domain}/work`
                },{
                    "@type": "ListItem",
                    "position": 2,
                    "name": title,
                }]
            }
        ]
    }
}

function getBlogPostSchema(canonicalURL, title, description, image, metadata) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "headline": title,
                "description": description,
                "author": {
                    "@type": "Person",
                    "name": personId
                },
                ...(metadata?.datePublished ? {"datePublished": formatDateYYYYMMDD(metadata.datePublished)} : {}),
                ...(metadata.dateUpdated ? {"dateModified": formatDateYYYYMMDD(metadata.dateUpdated)} : {}),
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonicalURL
                },
                ...(image ? { "image": `${siteData.domain}${image.src}` } : {})
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Work",
                    "item": `${siteData.domain}/writings`
                },{
                    "@type": "ListItem",
                    "position": 2,
                    "name": title,
                }]
            }
        ]
    }
}

function getWebPageSchema(canonicalURL, pathname, title, description) {
    const pageTypes = {
        "/about": "AboutPage",
        "/contact": "ContactPage",
        "/work": "CollectionPage",
        "/writings": "CollectionPage"
    };

    const type = pageTypes[pathname] || "WebPage";

    return {
        "@type": type,
        "name": title,
        "description": description,
        "url": canonicalURL,
        "isPartOf": {
            "@id": websiteId
        },
        "publisher": {
            "@type": "Person",
            "name": personId
        }
    }
}

export function getStructuredData(canonicalURL, pathname, title, description, image, metadata){
    // Checks to make sure page deserves schema
    const matches = include.some(base => pathname === base || pathname.startsWith(base + "/"));
    if (matches === false) return;

    if (pathname === "/") {
        return {
            "@context": "https://schema.org",
            "@graph": [
                baseSchemas.person,
                baseSchemas.website,
                getWebPageSchema(canonicalURL, pathname, title, description)
            ]
        }
    }
    else if (pathname.startsWith("/work/")) {
        return getCreativeWorkSchema(canonicalURL, title, description, image, metadata);
    }
    else if (pathname.startsWith("/writings/")) {
        return getBlogPostSchema(canonicalURL, title, description, image, metadata)
    }
    else {
        return {
            "@context": "https://schema.org",
            ...getWebPageSchema(canonicalURL, pathname, title, description)
        };
    }
}