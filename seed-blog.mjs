// Seed the blog collection with 7 SEO posts.
// Doc ID = slug, so re-running overwrites rather than duplicates.
// node seed-blog.mjs

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const serviceAccount = require('/Users/shaneruddle/Downloads/gen-lang-client-0174805651-ee94a058741d.json')

initializeApp({ credential: cert(serviceAccount), projectId: 'gen-lang-client-0174805651' })
const db = getFirestore('default')

const POSTS = [
  // ── 1. Family Days Out ──────────────────────────────────────────────────────
  {
    slug: 'family-days-out-near-pattaya',
    title: 'The Best Family Days Out Near Pattaya',
    metaTitle: 'Best Family Days Out Near Pattaya | Hemingways Lakeside',
    metaDescription: 'Looking for a family day out near Pattaya? Hemingways Lakeside has a pool, kids playroom and proper food on Lake Mabprachan — without resort prices.',
    excerpt: 'Pool, kids playroom, lakeside dining and meals around 300 THB. Why Hemingways Lakeside is the easiest family day out near Pattaya.',
    tags: ['family', 'kids', 'pool', 'pattaya'],
    publishedAt: '2026-06-11',
    imageSuggestion: 'Families relaxing at a lakeside restaurant terrace, kids splashing in a clean blue swimming pool, sunny day, casual tropical setting',
    content: `<p>The best family day out near Pattaya doesn't involve a theme park queue or a resort day-pass bill. Hemingways Lakeside, on Lake Mabprachan in East Pattaya, gives you a swimming pool, a kids' playroom, lakeside seating and a proper food menu in one spot — and the pool is free when you're dining. Most meals are around 300 THB.</p>

<h2>What makes a good family day out near Pattaya?</h2>
<p>Anyone with young kids knows the checklist. Somewhere for the kids to burn energy. Somewhere for the adults to actually relax. Food everyone will eat. Shade, toilets, parking, and a bill that doesn't sting.</p>
<p>Central Pattaya struggles with most of that. Beach days mean crowds and jet ski touts. Waterparks are fun but pricey once you've added food and lockers. Hotel pool passes often run 500–1,000 THB per person before you've eaten anything.</p>

<h2>Why is the Darkside worth the drive?</h2>
<p>The Darkside — the local name for East Pattaya around Lake Mabprachan — is about 30 minutes from the centre of town. It's where a big chunk of Pattaya's expat families actually live, and it shows. Quieter roads, greenery, lake views, and venues built for families rather than tourists.</p>
<p>The drive itself is easy. Straight out past the railway and you're in a different Pattaya: open space, fresh air, and a lake you can walk or cycle around.</p>

<h2>What does Hemingways Lakeside offer families?</h2>
<p>Pretty much everything on the checklist, in one venue:</p>
<ul>
<li><strong>Swimming pool</strong> — free to use when you're eating or drinking. No day-pass fee. Have a look at the <a href="/pool">pool page</a> for details.</li>
<li><strong>Kids' playroom</strong> — air-conditioned and indoors, so the little ones are sorted even in rainy season.</li>
<li><strong>Food everyone will eat</strong> — Western classics, Thai favourites, pizzas, burgers, a full kids' menu and proper breakfasts. Most mains around 300 THB.</li>
<li><strong>Lakeside seating</strong> — outdoor tables right on Lake Mabprachan, plus indoor air-con dining when it's hot.</li>
<li><strong>Something for the adults</strong> — a sports bar with 10+ screens and cold beer deals, so nobody's sacrificing their Saturday.</li>
</ul>

<h2>How much does a family day out cost at Hemingways?</h2>
<p>Less than you'd think. There's no entry fee and no pool charge for diners. A family of four can eat well, swim all afternoon and have a couple of drinks for roughly what two adult day-passes cost at a resort pool in town.</p>

<h2>Is it just for expats?</h2>
<p>Not at all. The crowd is a real mix — expat families, Thai families, couples out for lunch, and groups in for the football. Weekends are lively without being chaotic.</p>

<h2>What's on the menu?</h2>
<p>Proper variety, which matters when you're feeding fussy kids and hungry adults from the same table. Full English breakfasts, burgers, pizzas, pies and parmos on the Western side; an extensive Thai menu on the other; Indian dishes; steaks; and a dedicated kids' menu. Portions are generous and most mains sit around the 300 THB mark, so nobody is rationing the spring rolls.</p>

<h2>When's the best time to go?</h2>
<p>For a pool day, arrive late morning — swim before lunch, eat, then back in the pool while the adults graze. Sunset is the lake's party trick, so if you can stretch the day out until early evening, dinner on the terrace as the sky goes orange is the proper way to finish. Weekdays are quieter; weekends have more buzz and more kids for yours to play with. Either works.</p>

<h2>Do you need to book?</h2>
<p>Walk-ins are fine most days. For weekends, big groups or birthdays it's worth getting in touch ahead of time — the <a href="/events/kids">kids' parties page</a> covers what's possible if you want to turn a day out into a proper event.</p>

<h2>The short version</h2>
<p>If you want a full family day out near Pattaya — swim, play, eat, repeat — without resort pricing, Hemingways Lakeside is the easy answer. Thirty minutes from town, free pool with dining, and food that keeps everyone happy.</p>`,
  },

  // ── 2. Kids Birthday Party ──────────────────────────────────────────────────
  {
    slug: 'kids-birthday-party-venue-pattaya',
    title: 'Where to Have a Kids Birthday Party in Pattaya',
    metaTitle: 'Kids Birthday Party Venues in Pattaya | Hemingways',
    metaDescription: 'Planning a kids birthday party in Pattaya? Hemingways Lakeside handles the lot — party area, pool, playroom, food, cake and decorations for 100+ guests.',
    excerpt: 'Party area, pool, playroom, custom menus, cake and decorations — how Hemingways Lakeside takes the stress out of kids birthdays.',
    tags: ['kids', 'birthday', 'parties', 'pattaya'],
    publishedAt: '2026-06-08',
    imageSuggestion: 'Colourful kids birthday party setup with balloons and bunting at an outdoor venue, children playing in a pool in the background, birthday cake on a decorated table',
    content: `<p>The short answer: Hemingways Lakeside on Lake Mabprachan can run the whole kids' birthday party for you — dedicated party area, pool access, indoor playroom, custom food menu, cake, decorations and entertainment, with space for 100+ guests. You turn up, the kids go mental, you take the credit.</p>

<h2>What should you look for in a kids party venue?</h2>
<p>After you've hosted one party at home, you learn fast. The venue needs space for kids to run without anyone losing a drink. Entertainment that lasts longer than twenty minutes. Food that suits both kids and the parents who are stuck there for three hours. Shade and air-con, because Pattaya. And ideally, someone else doing the setup and the cleanup.</p>

<h2>Why are home parties so stressful?</h2>
<p>Because you're the venue, the caterer, the entertainer and the cleaner. Thirty kids in a condo common area or a rented house is chaos with a deposit at risk. Most parents do it once. The maths rarely works out cheaper either, once you've hired a bouncy castle, bought food and drinks for the adults, and lost a full weekend to it.</p>

<h2>What does Hemingways Lakeside offer for kids parties?</h2>
<ul>
<li><strong>A dedicated party area</strong> — your group gets its own space, not a corner of a busy restaurant.</li>
<li><strong>The pool</strong> — the headline act. Pool parties are what kids actually remember.</li>
<li><strong>Indoor playroom</strong> — air-conditioned backup for younger kids or a rainy afternoon.</li>
<li><strong>Custom party menus</strong> — kid-friendly food plus a proper menu for the adults, Western and Thai.</li>
<li><strong>Cake, decorations and entertainment</strong> — arranged for you. One conversation instead of ten suppliers.</li>
<li><strong>Room for 100+</strong> — invite the whole class. And their parents.</li>
</ul>

<h2>What do the parents do during the party?</h2>
<p>This is the underrated bit. While the kids are in the pool or the playroom, the adults are at a lakeside table with a cold drink and decent food. There's a sports bar with the football on. Nobody is standing in a soft-play centre checking their watch.</p>

<h2>How much does a kids birthday party cost?</h2>
<p>Packages are custom-built around your numbers and what you want included, so there's no fixed price list — but because the venue, pool and playroom are all in-house, you're not stacking up separate hire fees the way you would assembling a party from scratch. Tell the team your budget and headcount and they'll build something around it. Most parents find it compares well with a waterpark trip once you count entry fees, food and transport for twenty kids.</p>

<h2>What ages does it work for?</h2>
<p>Genuinely flexible. Toddler parties lean on the playroom and a quieter corner; primary-school kids live in the pool; teenagers get the pool plus pizza and music without the babyish trimmings. The space adapts, and the team has run all of them.</p>

<h2>How far is it from central Pattaya?</h2>
<p>About 30 minutes. Lake Mabprachan — the Darkside, as locals call it — is where a lot of Pattaya's expat families live anyway, so for many guests it's closer than town. There's parking, which is more than most central venues can say.</p>

<h2>What should you bring on the day?</h2>
<p>Swimwear, towels and sunscreen for the pool — that's about it. Food, cake, decorations and entertainment are handled, and the playroom means you don't need a wet-weather plan B. If you've got your own theme, cake or entertainer in mind, bring them along; the team works around whatever you've already organised rather than forcing the package on you.</p>

<h2>How do you book a kids birthday party at Hemingways?</h2>
<p>Send an enquiry through the <a href="/events/kids">kids' parties page</a> with your date, numbers and any ideas, and the team will put a package together. Dates go quickest on weekends, so the earlier the better.</p>

<p>One venue, one booking, zero cleanup. That's the whole pitch.</p>`,
  },

  // ── 3. Premier League ───────────────────────────────────────────────────────
  {
    slug: 'where-to-watch-premier-league-pattaya',
    title: 'Where to Watch the Premier League in Pattaya',
    metaTitle: 'Where to Watch the Premier League in Pattaya',
    metaDescription: 'Hemingways Lakeside shows every Premier League game on 10+ screens with sound on for the big ones, cold beer deals and proper food. East Pattaya.',
    excerpt: '10+ screens, sound on for the big games, cold beer deals and a full menu. Where to watch every Premier League game in Pattaya.',
    tags: ['sports', 'premier league', 'football', 'pattaya'],
    publishedAt: '2026-06-04',
    imageSuggestion: 'Sports bar interior with multiple large screens showing live football, fans watching, cold pints of beer on a wooden table in the foreground',
    content: `<p>If you want to watch the Premier League in Pattaya without squinting at one screen behind a pool table, head to Hemingways Lakeside in East Pattaya. 10+ screens, a dedicated sports bar, sound on for the big games, cold beer deals and a full food menu. And the house rule: if it's on TV, they'll get it on.</p>

<h2>Why is finding a good sports bar in Pattaya harder than it should be?</h2>
<p>Pattaya has hundreds of bars with a TV in the corner. That's not the same thing as a sports bar. The usual problems: the game you want is on the small screen, the sound is off in favour of a playlist, the kitchen shut an hour ago, and kickoff coincides with closing time.</p>
<p>Premier League kickoffs land at sociable times here — mostly 7pm to midnight Thai time — so there's no excuse for a venue not to show them properly.</p>

<h2>What should you look for in a Pattaya sports bar?</h2>
<p>Four things. Enough screens that your game is definitely on one of them. Sound on when it matters. Food that's better than a sad basket of chips. And staff who know the difference between the Premier League and the Championship when you ask them to change channel.</p>

<h2>What does Hemingways Lakeside offer for match days?</h2>
<ul>
<li><strong>10+ screens</strong> across a dedicated sports bar — multiple games on at once during the 10pm slot.</li>
<li><strong>Sound on for big games</strong> — derbies, title deciders and anything the room cares about.</li>
<li><strong>Cold beer deals</strong> — proper match-day pricing, not hotel-bar pricing.</li>
<li><strong>A full menu until late</strong> — burgers, pizzas, Thai food and more, most mains around 300 THB.</li>
<li><strong>Atmosphere</strong> — a real mix of expat regulars who treat it as their local. Busy for the big ones, never a fight for a seat on a normal weekend.</li>
</ul>
<p>Fixtures and what's being shown are on the <a href="/sports">sports page</a>.</p>

<h2>When do Premier League games kick off in Thailand?</h2>
<p>UK 3pm Saturday kickoffs land at 9pm or 10pm Thai time depending on the time of year — prime evening slot. The Saturday lunchtime game is 6.30pm–7.30pm here, and the late kickoff wraps up around 2am for the dedicated. Sunday's big fixtures hit late evening too. In other words, the Thai timezone is built for football, and the bar runs to match.</p>

<h2>Do you need to book a table for big games?</h2>
<p>For a normal weekend, no — there are enough screens and seats that you'll be fine. For derbies, title run-in fixtures and major fight nights, it's worth booking or arriving early. Big games on the Darkside pull a crowd, and the best seats by the main screens go first.</p>

<h2>What about sport that isn't football?</h2>
<p>Covered. Hemingways shows UFC, boxing, NFL, rugby, golf, F1 and cricket. Early-hours UFC cards and big boxing nights are a regular thing. If it's on TV anywhere, ask and they'll get it on a screen.</p>

<h2>Can you bring the family to watch the game?</h2>
<p>This is where Hemingways is different from every other sports bar in Pattaya. There's a swimming pool and a kids' playroom on site. The kids swim, you watch the match, everyone wins. Try doing that on Soi Buakhao.</p>

<h2>Where exactly is it?</h2>
<p>On Lake Mabprachan in East Pattaya — the Darkside — about 30 minutes from the centre. If you live out east, it's your local. If you're in town, it's a cheap Bolt ride for a guaranteed seat, sound on, and food that's actually good.</p>

<h2>The short version</h2>
<p>Every Premier League game, 10+ screens, sound on when it matters, cold beer at sensible prices and a kitchen that runs all day — on a lake, with a pool and playroom if the family's coming. That's the match-day setup. Check what's showing this week on the <a href="/sports">sports page</a> and get yourself a seat.</p>`,
  },

  // ── 4. Darkside Sports Bars ─────────────────────────────────────────────────
  {
    slug: 'best-sports-bars-darkside-pattaya',
    title: 'Best Sports Bars on the Darkside of Pattaya',
    metaTitle: 'Best Sports Bars on the Darkside, Pattaya',
    metaDescription: 'Living in East Pattaya? Hemingways Lakeside is the Darkside sports bar — 10+ screens on Lake Mabprachan, full menu, cold beer deals, every big game.',
    excerpt: 'The Darkside finally has a proper sports bar. 10+ screens, lakeside beers and a full menu at Hemingways on Lake Mabprachan.',
    tags: ['sports', 'darkside', 'east pattaya', 'lake mabprachan'],
    publishedAt: '2026-05-28',
    imageSuggestion: 'Relaxed outdoor bar terrace at dusk overlooking a calm lake, TV screens visible under the roof showing football, expats enjoying beers',
    content: `<p>The best sports bar on the Darkside of Pattaya is Hemingways Lakeside — 10+ screens, a dedicated sports bar, cold beer deals and a full Western and Thai menu, sitting right on Lake Mabprachan. If you live in East Pattaya, you no longer need to drive into town for the match.</p>

<h2>What is the Darkside of Pattaya?</h2>
<p>"The Darkside" is the local nickname for East Pattaya — the area east of the railway and Highway 36, centred on Lake Mabprachan. The name comes from the days when the area had barely any street lighting. These days it's one of the most popular places for expats to live: house-and-garden territory, quieter roads, and a fraction of the noise of central Pattaya.</p>

<h2>Why has the Darkside never had a proper sports bar?</h2>
<p>Plenty of bars out east will stick the football on. But a TV in a bar isn't a sports bar. The area has historically lacked a venue with enough screens for simultaneous games, sound on when it counts, a kitchen that runs all day, and somewhere your wife and kids actually want to be. The choice was a small local bar or a 30-minute drive into town — and a drive back after full-time, which nobody wants.</p>

<h2>What makes Hemingways Lakeside different?</h2>
<ul>
<li><strong>10+ screens</strong> in a dedicated sports bar — Premier League, UFC, boxing, NFL, rugby, golf, F1 and cricket. If it's on TV, they'll get it on. Check the <a href="/sports">sports page</a> for what's showing.</li>
<li><strong>The lakeside setting</strong> — watch the game with a beer and a lake view instead of a concrete soi. There's nothing else like it in Pattaya, town included.</li>
<li><strong>Proper food</strong> — this is a real restaurant, not a bar with a fryer. Burgers, pizzas, pies, steaks, Indian and a full Thai menu, mostly around 300 THB.</li>
<li><strong>Cold beer deals</strong> — local prices, not tourist prices.</li>
<li><strong>Family-friendly</strong> — pool and kids' playroom on site, so match day doesn't have to be a solo mission.</li>
</ul>

<h2>Can you make a full day of it?</h2>
<p>That's the Darkside way to do it. Sunday lunch with the family, kids in the pool, a walk around the lake before kickoff, then settle in for the evening games. Because it's a full restaurant and not just a bar, you're not killing time between fixtures — you're just having a good Sunday that happens to end with the football.</p>

<h2>What's the atmosphere like for big games?</h2>
<p>Busy and loud in the right way. The Darkside expat crowd is heavily British, so Premier League weekends are the main event, with a good showing for the 10pm kickoffs. Big fight nights and derby days fill up — worth arriving early or booking a table.</p>

<h2>What's there besides the sport?</h2>
<p>This is the bit that makes it more than a bar. There's a swimming pool — free when you're dining — a kids' playroom, indoor air-conditioned dining and a big outdoor terrace on the water. Practical upshot: you can bring the family on match day, or come for Sunday lunch and stay for the 10pm kickoff. No other sports venue in Pattaya stretches across a whole day like that.</p>

<h2>Is it worth coming from central Pattaya?</h2>
<p>For a big match, yes. Thirty minutes gets you guaranteed screens, sound, a seat, and food you'd actually order again. Make an afternoon of it: the lake's worth a lap before kickoff, and parking is free — try finding that in town on a Saturday night.</p>

<h2>The verdict</h2>
<p>The Darkside has thousands of expats and, until now, nowhere built for match day. Hemingways Lakeside fills the gap — and the lake view is a bonus no bar in town can match.</p>`,
  },

  // ── 5. Corporate Events ─────────────────────────────────────────────────────
  {
    slug: 'corporate-event-venue-pattaya',
    title: 'Planning a Corporate Event in Pattaya — Why You Should Skip the Hotel',
    metaTitle: 'Corporate Event Venues in Pattaya | Skip the Hotel',
    metaDescription: 'Hotel meeting rooms are forgettable. Hemingways Lakeside hosts corporate events for 100+ with private lakeside spaces, custom menus and a pool.',
    excerpt: "Private lakeside spaces, custom catering and room for 100+. The corporate event venue that isn't another hotel function room.",
    tags: ['corporate', 'events', 'pattaya', 'eastern seaboard'],
    publishedAt: '2026-05-21',
    imageSuggestion: 'Elegant long-table dinner setup on a lakeside terrace at golden hour, string lights, professional but relaxed corporate group dining outdoors',
    content: `<p>If you're planning a corporate event in Pattaya, here's the case for skipping the hotel: Hemingways Lakeside offers private spaces for 100+ guests — indoor air-conditioned dining room, outdoor lakeside terrace, pool area, or the full venue — with custom menus and none of the function-room sterility. Your team gets an evening they'll actually talk about.</p>

<h2>What's wrong with hotel venues?</h2>
<p>Nothing — and that's the problem. Hotel ballrooms are competent and completely interchangeable. Same carpet, same buffet, same projector screen. Your staff have sat through a dozen of them, and they can't tell you which company event happened in which hotel. Add city-centre pricing, per-head minimums and corkage, and you're paying a premium to be forgettable.</p>

<h2>What makes a corporate event actually work?</h2>
<p>People remember how an evening felt, not the agenda. The events that land share a few things: a setting that doesn't feel like work, space for people to move and mix rather than sit in assigned seats, food worth commenting on, and enough flexibility to make the night feel like yours rather than a package off a laminated menu.</p>

<h2>Why does a lakeside venue beat a function room?</h2>
<p>Because the setting does half the work. Sunset over Lake Mabprachan, drinks on the terrace, dinner by the water — people relax faster, mix more, and stay later. That's the actual point of a team event. You can't team-build under fluorescent lighting.</p>

<h2>What can Hemingways Lakeside offer for corporate events?</h2>
<ul>
<li><strong>Flexible private spaces</strong> — indoor air-con dining room, outdoor lakeside terrace, the pool area, or full venue hire for 100+ guests.</li>
<li><strong>Custom menus</strong> — Western and Thai, set menus, buffets or sharing-style, built around your budget rather than a fixed package.</li>
<li><strong>Built-in entertainment</strong> — sports bar with 10+ screens, the pool, and lawn space for activities or awards.</li>
<li><strong>Sensible pricing</strong> — restaurant pricing, not hotel banqueting pricing.</li>
<li><strong>A team that says yes</strong> — themed nights, branding, AV, entertainment. One contact, not a banqueting department.</li>
</ul>

<h2>What kinds of corporate events work at Hemingways?</h2>
<p>The usual suspects and a few you might not have considered. Year-end and New Year staff parties are the big one — full venue, buffet, awards, music. Team-building days use the lawn, pool and lakeside space, then roll into dinner. Client entertainment works well on the terrace: more relaxed than a hotel restaurant, more impressive than another steakhouse. And smaller management dinners or department celebrations fit the private indoor room without hiring half a hotel floor. Sales meeting in the morning, pool and barbecue in the afternoon — that's a format hotels simply can't do.</p>

<h2>Where is it, and does the location work for Eastern Seaboard companies?</h2>
<p>That's the quiet advantage. Hemingways sits on Lake Mabprachan in East Pattaya — roughly 30 minutes from central Pattaya, and an easy run from the Amata and Hemaraj (WHA) industrial estates via Highway 36 and the motorway. For factories and offices on the Eastern Seaboard, it's closer than fighting through Pattaya traffic to a beachfront hotel, with parking when you arrive.</p>

<h2>How much does it cost compared to a hotel?</h2>
<p>There's no banqueting department mark-up, which is the honest answer. Menus are priced as restaurant food — most mains around 300 THB on the regular menu — and event packages are quoted custom against your headcount and format. No room hire stacked on top of per-head minimums, no corkage games. For most companies the same budget that buys a beige hotel function buys the whole lakeside evening here.</p>

<h2>How do you book?</h2>
<p>Send your date, headcount and rough idea through the <a href="/events/corporate">corporate events page</a>. The team will come back with space options and menu suggestions. Year-end party season books out early — if you're eyeing November or December, move now.</p>`,
  },

  // ── 6. Birthday Venues ──────────────────────────────────────────────────────
  {
    slug: 'best-birthday-party-venues-pattaya',
    title: 'The Best Birthday Party Venues in Pattaya',
    metaTitle: 'Best Birthday Party Venues in Pattaya (Kids & Adults)',
    metaDescription: 'Kids party or adult birthday in Pattaya? Hemingways Lakeside does both — pool, playroom and party packages, or lakeside dining and private spaces for 100+.',
    excerpt: 'Kids pool parties or grown-up lakeside celebrations — one venue handles both, with private space for 100+ guests.',
    tags: ['birthday', 'parties', 'events', 'pattaya'],
    publishedAt: '2026-05-14',
    imageSuggestion: 'Birthday celebration at a lakeside restaurant in the evening, cake with candles being carried to a long table of happy guests, warm lighting, lake in background',
    content: `<p>The best birthday party venue in Pattaya depends on who's having the birthday — but Hemingways Lakeside covers both ends. Kids get a pool party with a playroom and a full party package; adults get lakeside dining, a proper bar and flexible private spaces for up to 100+ guests. One venue, both jobs done.</p>

<h2>What should you look for in a birthday venue?</h2>
<p>Four things, whatever the age. Space — your group needs its own area, not three pushed-together tables in a busy restaurant. Food — good enough that people remember it, flexible enough to suit everyone. Atmosphere — somewhere that feels like an occasion. And flexibility — a venue that builds the party around you instead of selling you Package B.</p>

<h2>Where can you hold a kids birthday party in Pattaya?</h2>
<p>The usual options are soft-play centres, waterparks or doing it at home. All workable, all with drawbacks: time limits, entry fees per head, or thirty kids in your living room.</p>
<p>Hemingways takes the headaches out. Dedicated party area, the pool as the main event, an air-conditioned playroom as backup, custom kids' menus, cake, decorations and entertainment all arranged for you — with space for the whole class and their parents. Full details on the <a href="/events/kids">kids' parties page</a>.</p>

<h2>What about adult birthdays — what are the options?</h2>
<p>Central Pattaya gives you rooftop bars (pricey, weather-dependent), beach clubs (great until the bill arrives) or a restaurant booking that ends at table-clearing time.</p>
<p>Hemingways does grown-up birthdays properly: a long table on the lakeside terrace for sunset, the indoor air-con dining room, or the whole venue for a big one. Add the sports bar, cold beer deals, and a menu that runs from steaks and pizzas to a full Thai spread — most mains around 300 THB, so feeding 40 people doesn't need a loan. See the <a href="/events/birthdays">birthday parties page</a> for options.</p>

<h2>Can you do themes, surprises and entertainment?</h2>
<p>Yes — decorations, themed setups, cakes, music and entertainment can all be arranged, and surprise parties are a regular request (the lakeside terrace makes a decent reveal spot). If you've already booked your own band, DJ or entertainer, the venue works around them. The point is flexibility: it's your party, not a fixed package with your name written on it.</p>

<h2>How many guests can Hemingways handle?</h2>
<p>100+ for a full takeover, with smaller private areas for more modest dos. Milestone birthdays — 40ths, 50ths, 60ths — are regular fixtures, often with live music or a screen for the obligatory embarrassing photo slideshow.</p>

<h2>What food can you have at a birthday party?</h2>
<p>Whatever suits the crowd. Kids' parties run on crowd-pleasers — pizzas, nuggets, chips, ice cream — with proper food for the parents alongside. Adult parties can go set menu, buffet or sharing-style across the Western and Thai menus: steaks, pies, parmos, curries, the lot. Cakes can be arranged, dietary requirements handled, and because menus are custom, you're paying for what your guests actually eat rather than a hotel banquet formula.</p>

<h2>Can you do a joint family celebration?</h2>
<p>This is where the venue really earns it. Kids in the pool and playroom, adults on the terrace with a drink — a birthday that works for the whole family without anyone compromising. Very few venues in Pattaya can run both at once.</p>

<h2>How do you book?</h2>
<p>Enquire with your date, numbers and what you have in mind, and the team will quote a custom package — there's no one-size-fits-all menu. Weekends book first, especially in high season. Start at the <a href="/events/birthdays">birthdays page</a> and they'll take it from there.</p>`,
  },

  // ── 7. Lake Mabprachan ──────────────────────────────────────────────────────
  {
    slug: 'lake-mabprachan-pattaya-hidden-gem',
    title: "Lake Mabprachan — Pattaya's Hidden Gem",
    metaTitle: "Lake Mabprachan — Pattaya's Hidden Gem",
    metaDescription: "Lake Mabprachan is East Pattaya's quiet escape — green, calm and 30 minutes from town. Here's why it's worth the trip, and where to eat when you arrive.",
    excerpt: "Green, calm and half an hour from the chaos. A local's guide to Lake Mabprachan — and the lakeside venue that makes the trip worth it.",
    tags: ['lake mabprachan', 'darkside', 'east pattaya', 'guide'],
    publishedAt: '2026-05-07',
    imageSuggestion: 'Scenic wide shot of Lake Mabprachan at sunset, calm water reflecting the sky, lush green banks, restaurant terrace with diners visible in the foreground',
    content: `<p>Lake Mabprachan is the Pattaya most visitors never see: a large reservoir in East Pattaya ringed by greenery, lakeside restaurants and quiet roads, about 30 minutes from Walking Street and a world away from it. If central Pattaya is wearing you out, this is where you reset — and Hemingways Lakeside is the best base on the water to do it from.</p>

<h2>What is Lake Mabprachan and where is it?</h2>
<p>It's a reservoir in East Pattaya, east of the railway and Highway 36, in the area locals call the Darkside. The nickname dates back to when the area had barely any street lights; these days it's leafy expat suburbia. The lake itself is the centrepiece — a few kilometres around, with a road that loops the shoreline.</p>

<h2>Why do expats love living near the lake?</h2>
<p>Space and pace. Out here the money that gets you a condo box in town gets you a house with a garden. Mornings around the lake are joggers, cyclists and fishermen rather than baht buses and bar touts. There's a big, established expat community — heavily British and European — with the everyday essentials (markets, gyms, international schools) all nearby. It's the part of Pattaya where people actually live, rather than visit.</p>

<h2>What is there to do at Lake Mabprachan?</h2>
<ul>
<li><strong>Walk or cycle the loop</strong> — the shoreline road is the Darkside's unofficial running track, best at sunrise or sunset.</li>
<li><strong>Fish</strong> — locals line the banks most evenings.</li>
<li><strong>Eat and drink by the water</strong> — a string of lakeside restaurants and coffee shops, from Thai grills to Western venues.</li>
<li><strong>Watch the sunset</strong> — the west-facing banks get a proper show over the water most evenings.</li>
</ul>

<h2>Why is Hemingways Lakeside the standout venue on the lake?</h2>
<p>Because it's the one place that does everything well. A full Western and Thai menu with most mains around 300 THB. A swimming pool that's free when you dine. A kids' playroom. A sports bar with 10+ screens for the football. Indoor air-con dining and an outdoor terrace right on the water. It works as a lazy family Sunday, a date-night dinner, a match-day local and a private event space — which is why it's become the Darkside's default answer to "where shall we go?"</p>

<h2>How do you get to Lake Mabprachan from Pattaya?</h2>
<p>Easy run: head east on Soi Siam Country Club or Highway 36 and follow signs for Mabprachan — around 30 minutes from central Pattaya, less from Jomtien via the back roads. A Bolt or Grab costs a couple of hundred baht. If you're driving, there's free parking at Hemingways, and the exact pin is on the <a href="/location">location page</a>.</p>

<h2>When is the best time to visit the lake?</h2>
<p>Early morning and late afternoon are the sweet spots. Mornings are cool, calm and local — joggers, mist on the water if you're lucky, and the lakeside coffee shops just opening. From about 4pm the heat drops, the light goes golden and the terraces fill up. Midday is doable but hot; that's what Hemingways' pool and air-con dining are for. Rainy season afternoons can throw a storm at you, but watching one roll across the lake from under cover, beer in hand, is its own kind of entertainment.</p>

<h2>Is it worth the trip if you're only in Pattaya for a week?</h2>
<p>Yes — precisely because it's nothing like the rest of your week. Come out mid-afternoon, walk a stretch of the lake, swim while the kids hit the playroom, then stay for sunset and dinner on the terrace. It's the cheapest change of scenery in Pattaya, and the one most visitors never find.</p>`,
  },
]

const now = new Date().toISOString()

for (const post of POSTS) {
  await db.collection('blog').doc(post.slug).set({
    ...post,
    author: 'Hemingways Team',
    status: 'published',
    createdAt: now,
  })
  console.log(`✓ ${post.slug}`)
}

console.log(`\nDone — ${POSTS.length} posts seeded to blog collection (database: default).`)
process.exit(0)
