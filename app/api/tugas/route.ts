import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export async function GET() {
    const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
        'Cookie': '_gid=GA1.3.229358743.1761099139; MoodleSession=okhglo933qhaas2pvklrpca8dt; _gat_gtag_UA_136322686_1=1; _ga_HC2KSK800P=GS2.1.s1761111502$o5$g1$t1761111989$j59$l0$h0; _ga=GA1.1.1603466381.1760941137'
    };

    // 1. Ambil dashboard
    const dashboardRes = await fetch('https://lms.unikom.ac.id/my/', { headers });
    const dashboardHtml = await dashboardRes.text();
    const $ = cheerio.load(dashboardHtml);

    // 2. Ambil semua URL course
    const courseLinks: string[] = [];
    $('ul.sidebar-accordion-body a').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('course/view.php?id=')) courseLinks.push(href);
    });

    const courses: any[] = [];

    // 3. Loop tiap course
    for (const url of courseLinks) {
        const courseRes = await fetch(url, { headers });
        const courseHtml = await courseRes.text();
        const $$ = cheerio.load(courseHtml);

        // Ambil judul course dari <header id="page-header"> h1
        const title = $$('#page-header h1').text().trim() || url;

        const sections: any[] = [];
        $$('li.section.main.clearfix').each((_, sec) => {
            const sectionName = $$(sec).find('span.hidden.sectionname').text().trim();
            const summary = $$(sec).find('div.content > div.summarytext').text().trim();
            const resources: any[] = [];

            $$(sec).find('li.activity').each((_, r) => {
                const aTag = $$(r).find('a');
                const title = aTag.text().trim();
                const link = aTag.attr('href');
                if (title && link) resources.push({ title, link });
            });

            sections.push({ sectionName, summary, resources });
        });

        courses.push({ title, url, sections });
    }

    return NextResponse.json({ courses });
}
