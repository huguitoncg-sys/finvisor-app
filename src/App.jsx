import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import _ from "lodash";

// --- EMBEDDED TOP 60 PROSPECTS ---
const DEFAULT_DATA = [{"name": "Ajai Thomas", "current_role": "Partner - Head of Business Development at Trevally Capital LLC", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/ajaithomas", "icp_match_score": 95, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Finance industry veteran with 30+ years experience, recently promoted to Partner at newly-founded Trevally Capital LLC (September 2024). NYC-based hedge fund operator specializing in structured products and mortgage-backed securities with extensive investor relations background and proven ability to raise $1.25B+ in capital.", "match_reasons": ["Partner-level role at alternative asset management firm - estimated income $500K-$2M+ with carried interest", "NYC-based, confirmed in profile at New York, New York", "30+ years experience in finance with seniority progression from analyst to Partner", "Head of Business Development role managing institutional investor relationships (pensions, sovereign wealth funds, endowments, family offices)", "Founded/co-founded Trevally Capital in 2024 as minority-run, 100% employee-owned partnership - ownership equity position"], "why_now_reasons": ["Promoted to Partner at newly-founded Trevally Capital in September 2024 - very recent transition with new equity stake and ownership structure", "New partnership likely comes with K-1 income, carried interest distributions, and complex tax situations requiring optimization", "Transitioning from 10+ year tenure at Hollis Park to new entity signals inflection point in wealth accumulation and tax planning needs", "Minority-owned, employee-owned structure may create specific succession and wealth preservation planning needs"], "concerns": [], "recommended_outreach_angle": "Congratulate on partnership launch at Trevally Capital; offer specialized tax optimization and wealth planning for partners with carried interest exposure and to discuss strategies for managing K-1 income complexity and owner-level wealth preservation as the firm scales."}, {"name": "Evan Eason", "current_role": "Managing Partner at Rally Equity Partners", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/evan-eason-938a255", "icp_match_score": 95, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Managing Partner at newly formed Rally Equity Partners with 21+ years of private equity experience. Previously Managing Director at Intermediate Capital Group (ICG). Harvard AB and Wharton MBA with deep expertise in institutional investing.", "match_reasons": ["Managing Partner role at PE firm indicates estimated income $1-5M+ annually", "NYC-based, confirmed in profile (Greater New York City Area)", "22 years total experience in finance/PE at peak earning years (likely age 48-52)", "Led partnership at Olympus Partners (13 years) and ICG (5 years) demonstrates senior decision-maker status", "Founded Rally Equity Partners with institutional backing, clear wealth accumulation and carried interest exposure"], "why_now_reasons": ["Recently launched Rally Equity Partners in January 2025 - brand new fund with capital deployment ahead", "Announced closing inaugural platform investment within weeks of firm launch - active growth phase", "First-time founder/Managing Partner likely navigating new tax structure (K-1, self-employment taxes, profit allocations)", "Career transition from MD at large public company to founder signals significant compensation restructuring"], "concerns": [], "recommended_outreach_angle": "Congratulate on Rally Equity Partners launch and offer specialized guidance on PE partner tax optimization, carried interest structuring, and wealth preservation as the fund scales."}, {"name": "Michael Deyong", "current_role": "Co-Head, Global M&A Practice at White & Case LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/mdeyong", "icp_match_score": 95, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Co-Head of Global M&A Practice at White & Case LLP with 19+ years of experience. Promoted to Co-Head in January 2025 after serving as Head of Americas M&A. Based in NYC, he specializes in M&A and corporate transactions at an AmLaw 10 firm.", "match_reasons": ["Co-Head of Global M&A Practice at White & Case - top-tier AmLaw law firm, estimated partner income $2-5M+", "NYC-based, confirmed in profile (New York, New York, United States)", "19 years and 5 months total experience puts him at 45-48 years old, peak earning and wealth accumulation phase", "Partner since January 2017, increasing seniority to Co-Head role with carried interest and partnership distributions", "Recognized as Super Lawyer and M&A Advisor '40 Under 40' Emerging Leader - high-profile rainmaker status"], "why_now_reasons": ["Promoted to Co-Head, Global M&A Practice in January 2025 - significant elevation and new equity stake/profit distribution", "Progression from Head of Americas (Jan 2023-Jan 2025) to Global Co-Head signals expanded compensation and responsibility", "As global co-head, likely navigating complex K-1s, partner distributions across multiple jurisdictions, and tax optimization challenges", "At 19+ years career and partnership since 2017, managing substantial accumulated wealth and considering long-term tax/retirement strategy"], "concerns": [], "recommended_outreach_angle": "Congratulate on global co-head promotion; offer strategic insight on cross-border tax optimization, partner-level wealth structuring, and succession planning strategies for top equity partners at major law firms."}, {"name": "Yasmina Odjo", "current_role": "Senior Partner at iVESTA Family Office", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/yasmina-odjo-cfa", "icp_match_score": 95, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Senior Partner at iVESTA Family Office with 19+ years of wealth management experience. Recently promoted to Senior Partner in January 2025 after leading HSBC's UHNW Center of Excellence. CFA charterholder managing multi-billion dollar portfolios for high-net-worth clients.", "match_reasons": ["Senior Partner at boutique family office - estimated income $1M-$5M+", "NYC-based, confirmed in profile", "19+ years in finance with progressive senior leadership roles (MD, SVP, VP)", "CFA charterholder with deep investment and credit expertise managing HNWI clients", "Experience managing cross-border wealth and multi-billion dollar portfolios demonstrates elite wealth management expertise"], "why_now_reasons": ["Promoted to Senior Partner at iVESTA Family Office in January 2025 - recent significant career transition with new equity stake", "Move from corporate banking (HSBC) to boutique family office represents potential liquidity event and role change", "19+ years in wealth management puts her at 45-50 years old, peak earning and wealth concentration years", "Leadership of UHNW Center of Excellence suggests deep client relationships and significant asset base under management"], "concerns": ["iVESTA Family Office is 11-50 employees - smaller firm, may have lower compensation than HSBC, though partner equity could offset", "Career transition from HSBC to iVESTA occurred January 2025, only 11 months ago; verify equity structure and equity lock-ups"], "recommended_outreach_angle": "Congratulate on partnership elevation at iVESTA; explore transition planning and wealth concentration strategy as her own net worth likely grew significantly with partner equity stake."}, {"name": "Aarti Kapoor", "current_role": "Managing Director, Consumer & Retail Investment Banking at Cascadia Capital", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/aarti-kapoor1", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Managing Director of Consumer & Retail Investment Banking at Cascadia Capital with 18+ years of experience in finance. Recently promoted to MD in November 2025, bringing prestigious Wall Street background from Goldman Sachs and Moelis. Harvard graduate with proven track record as Forbes 30 Under 30 and Business Insider Wall Street Rising Star.", "match_reasons": ["NYC-based (New York, New York confirmed)", "Managing Director role at boutique investment bank - estimated income $500K-$2M+ annually with carry potential", "18+ years of experience in elite finance roles (Citi, Moelis, Goldman Sachs) places her in prime wealth accumulation phase", "Previous Partner role at VMG Partners (PE/VC) and CEO of SPAC demonstrates equity compensation exposure", "Harvard education and elite firm backgrounds signal high earning potential", "Finance industry directly aligns with ICP 2 criteria"], "why_now_reasons": ["Promoted to Managing Director at Cascadia Capital in November 2025 - recent title elevation with likely equity stake", "MD role means increased partnership economics and compensation structure change", "Recent transition from Partner at VMG (Aug 2025) to MD role suggests active career progression and new equity arrangements", "SPAC CEO experience (VMG Consumer Acquisition Corp) indicates familiarity with liquidity events and equity compensation", "18+ years career trajectory suggests approaching peak earning years with tax complexity"], "concerns": ["Profile shows recent job transitions (Partner -> MD within ~3 months) which could indicate restructuring or different opportunity", "No explicit mention of personal wealth or net worth indicators beyond role"], "recommended_outreach_angle": "Congratulate on MD appointment at Cascadia; offer specialized insights on investment banking compensation structuring, partner tax strategies, and wealth preservation for growth-stage professionals managing multiple equity positions."}, {"name": "Andrew Jacobs", "current_role": "Partner @ Winston & Strawn LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/andrewbjacobs", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Partner at Winston & Strawn LLP specializing in leveraged finance, private credit, and capital markets with 19+ years of experience. Recently promoted to Partner in March 2025, based in NYC. Represents leading investment firms and commercial banks on complex financing transactions.", "match_reasons": ["Partner at AmLaw 50 firm (Winston & Strawn) - estimated income $1-5M+", "NYC-based, confirmed in profile (New York, New York, United States)", "19+ years total experience puts him in prime wealth accumulation and tax complexity phase", "Leveraged finance and M&A practice involves significant deal-related compensation, bonuses, and equity stakes", "C-suite/Partner department designation confirms senior leadership role"], "why_now_reasons": ["Promoted to Partner at Winston & Strawn in March 2025 - immediate income elevation and new partnership equity", "Recent career move from Cahill Gordon (Nov 2021-Mar 2025) to Winston & Strawn suggests a significant compensation jump", "Partnership elevation creates new tax complexity (K-1 income, self-employment taxes, retirement plan optimization)", "Active in leveraged finance industry with exposure to deal bonuses and variable compensation", "LinkedIn activity shows engagement with industry (moderated Fitch Ratings/LSTA panel), suggesting active deal flow"], "concerns": [], "recommended_outreach_angle": "Congratulate on recent Partnership at Winston & Strawn; position Finvisor as trusted advisor for new partners navigating K-1 tax optimization, succession planning, and wealth diversification strategies for concentrated partnership interests."}, {"name": "Ashley Caldwell", "current_role": "Managing Director, Investment Banking at Goldman Sachs", "location": "New York City Metropolitan Area, US", "linkedin_url": "https://linkedin.com/in/ashley-caldwell-11658910", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Managing Director of Investment Banking at Goldman Sachs with 18+ years of experience. Recently promoted to MD in Investment Banking (May 2025). NYC-based with career progression from IBM to RBC Capital Markets to Goldman Sachs.", "match_reasons": ["Managing Director at Goldman Sachs - one of the most prestigious investment banks, estimated compensation $2-5M+ annually", "NYC-based, confirmed in profile (New York City Metropolitan Area)", "18+ years total experience at age estimate 42-45, peak earning and wealth accumulation years", "C-Suite level position in Financial Services with exposure to deal-related compensation and carried interest"], "why_now_reasons": ["Promoted to Managing Director, Investment Banking in May 2025 - only 4 months ago, significant income and equity increase", "Recent elevation to MD creates new tax complexity with K-1 income, bonus structures, and deferred compensation", "New MD compensation structure likely includes MD equity stake and carried interest opportunities from deal flow"], "concerns": ["Education completion dates suggest birth year ~1985, making her approximately 40 years old - slightly below typical high-income professional target range of 35-55 but still squarely in range"], "recommended_outreach_angle": "Congratulate on recent MD promotion at Goldman Sachs; offer specialized guidance on tax optimization for new MD compensation structures, equity management, and wealth preservation strategies common at Goldman's leadership tier."}, {"name": "Ellen Holloman", "current_role": "Litigation Partner at Kaplan Martin LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/ellen-holloman-68019b79", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Litigation Partner with 26+ years of experience, recently promoted to Partner at Kaplan Martin LLP in June 2025 after 7+ years at Cadwalader (AmLaw 50 firm). Harvard Law graduate based in NYC with extensive trial and regulatory investigation practice.", "match_reasons": ["Partner at law firm - estimated annual income $500K-$2M+", "26+ years of legal experience puts her in peak earning and wealth accumulation years (likely age 50-55)", "NYC-based, confirmed in profile", "Harvard Law graduate with experience at top-tier firms (Sullivan & Cromwell, Cadwalader, Kaplan Martin)", "Litigation specialization and partner distributions represent significant income and carried interest"], "why_now_reasons": ["Promoted to Partner at Kaplan Martin LLP in June 2025 - very recent career move and role elevation", "Transition from AmLaw 50 (Cadwalader, 1001-5000 employees) to boutique firm suggests strategic career move for equity and control", "Move to smaller firm (11-50 employees) likely signals higher equity stake and business ownership opportunity", "26+ years in practice suggests approaching peak earning years and potential wealth consolidation phase"], "concerns": ["Kaplan Martin LLP is a newer boutique firm (founded 2024), smaller than her previous firm, which could indicate lower overall firm revenue/resources", "Recent transition (5 months in current role) may mean still settling into new position before wealth planning discussions", "Profile shows limited personal wealth indicators (no mentions of board positions, significant outside investments, or real estate)"], "recommended_outreach_angle": "Congratulate on partnership transition to Kaplan Martin; position wealth management for managing partner distributions, optimizing K-1 tax implications from boutique firm equity, and succession planning strategies for law partners."}, {"name": "Jared Davidson", "current_role": "Partner at Asante Capital Group", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/jared-davidson-53534069", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Partner at Asante Capital Group, a private equity and capital solutions firm, with 12+ years of experience in fundraising and investor relations. Promoted to Partner in April 2025, with prior roles at KKR, American Securities, and other top-tier financial institutions. NYC-based with deep expertise in PE transactions and capital markets.", "match_reasons": ["Partner at established PE firm (51-200 employees, founded 2011) - estimated income $500K-$2M+ with partnership equity", "NYC-based, confirmed in profile", "12+ years of experience, roughly age 33-37, with trajectory suggesting significant wealth accumulation", "Finance industry specialist with fundraising and investor relations background - exposed to deal economics and carried interest potential"], "why_now_reasons": ["Promoted to Partner in April 2025 - very recent promotion means new equity stake and significant income jump", "First year as Partner brings new tax complexity (K-1 income, self-employment taxes, partnership distributions)", "As PE partner, likely managing significant capital and deal flow - estate and tax planning increasingly important"], "concerns": ["Age inference from 2007-2011 education suggests early 30s, slightly below typical high-income professional ICP range of 35-55", "Limited public profile activity suggests lower social media presence, may prefer different outreach channels"], "recommended_outreach_angle": "Congratulate on recent partnership elevation; position Finvisor as ideal partner for PE professionals navigating new K-1 tax complexity, concentrated equity positions, and succession planning at growth-stage PE firms."}, {"name": "Michael Murrer", "current_role": "Managing Director - Real Estate, Gaming, Lodging And Leisure at Wedbush Securities", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/michaelmurrer", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Managing Director at Wedbush Securities specializing in Real Estate, Gaming, Lodging and Leisure investment banking with 18+ years of experience. Recently promoted to MD at Wedbush in January 2025 after 14+ years as MD at Jefferies. NYC-based with strong capital markets activity.", "match_reasons": ["Managing Director at investment banking firms (Wedbush, Jefferies) - estimated income $500K-$2M+ with carried interest and deal bonuses", "NYC-based, confirmed location in profile", "18+ years total experience with 14+ years as MD - peak earning and wealth accumulation phase", "Investment banking focus on real estate and gaming transactions provides regular deal-related compensation opportunities", "Senior leadership position managing entire business line (Gaming, Lodging, Leisure)"], "why_now_reasons": ["Promoted to Managing Director at Wedbush in January 2025 - moved to new firm with likely signing bonus and new equity stake", "Recently transitioned roles (Jan 2025) suggests potential liquidity event from previous firm and concentrated wealth in new role", "14+ years at Jefferies as MD followed by move indicates established track record; significant tax planning opportunity during transition", "Active in high-profile real estate and entertainment transactions - current deal flow suggests income volatility and need for diversification strategy"], "concerns": ["Profile shows recent job change, which could indicate either opportunity or market-driven transition (neutral signal)"], "recommended_outreach_angle": "Congratulate on leadership role at Wedbush; offer specialized insights on wealth preservation and tax optimization for investment banking MDs navigating transition compensation, carried interest, and concentrated deal-related income."}, {"name": "Patrick Schafer", "current_role": "Partner at BC Partners", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/patrick-schafer-17076880", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Partner at BC Partners, a leading private equity firm, with 18 years of experience in finance and investment management. Recently promoted to Partner in July 2025 after 6 years as Managing Director. NYC-based with deep expertise in credit and private equity investing.", "match_reasons": ["Partner at elite PE firm (BC Partners) - estimated income $2M-5M+ with carried interest", "NYC-based, confirmed in profile", "18 years total experience with 7+ years in senior roles (Principal, MD, Partner)", "Career trajectory shows exponential wealth accumulation: Analyst -> Associate -> Principal -> MD -> Partner", "Private equity/credit role provides significant carried interest and deal economics"], "why_now_reasons": ["Promoted to Partner July 2025 - just 6 months ago, major income and equity stake increase", "First year as Partner means new tax complexity (K-1 income, self-employment taxes, partnership distributions)", "PE partnership typically includes significant carried interest that will compound over time", "At optimal wealth accumulation stage (likely mid-40s with peak earning years ahead)"], "concerns": [], "recommended_outreach_angle": "Congratulate on recent Partner promotion at BC Partners; offer expertise on tax optimization for new PE partners navigating carried interest structures, partnership distributions, and wealth diversification strategies."}, {"name": "Samuel Francis", "current_role": "Partner - Investment Funds at Vinson & Elkins", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/samuelfrancis", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Partner in Investment Funds at Vinson & Elkins with 16.5 years of experience spanning top-tier law firms and quantitative hedge funds. Recently promoted to Partner at V&E in June 2025 after 4 years as Partner at Kirkland & Ellis. NYC-based with deep expertise in private equity, hedge fund formation, and asset management M&A.", "match_reasons": ["Partner at global top-tier law firm (V&E) - estimated income $1-3M+", "NYC-based, confirmed in profile across multiple roles", "Investment Funds practice at AmLaw firms with focus on PE/hedge funds indicates exposure to significant deal economics", "16.5 years of professional experience puts him at mid-to-late 40s, prime wealth accumulation and diversification phase", "Best Lawyers recognition (2026) validates elite status and earning power"], "why_now_reasons": ["Partner move from Kirkland & Ellis to Vinson & Elkins June 2025 - only 6 months ago, likely significant compensation discussion and new partnership structure", "Recent lateral partner move suggests wealth event and possible equity diversification needs", "Promotion timeline aligns with urgency triggers: new firm partnership means revised tax planning, K-1 complexity, and retirement plan optimization", "Recent speaking engagements and publications (Nov 2025) show active business development and elevated profile"], "concerns": [], "recommended_outreach_angle": "Acknowledge his recent lateral move to Vinson & Elkins and offer strategic guidance on maximizing after-tax wealth from partnership economics, optimizing K-1 structures, and building a diversified portfolio outside concentrated law firm interests."}, {"name": "Sebastian Fain", "current_role": "M&A Partner and Co-Head of Cross-Border M&A at Gibson Dunn", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/sebastian-fain-8961ab151", "icp_match_score": 94, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "M&A Partner at Gibson Dunn with 20+ years of experience specializing in cross-border mergers, acquisitions, and complex corporate transactions. Recently promoted to Partner at Gibson Dunn in November 2025 after 6.5 years as Partner at Freshfields. Harvard Law graduate with extensive deal experience across public company mergers, private equity acquisitions, and hostile takeovers.", "match_reasons": ["Partner at top-tier law firm (Gibson Dunn) - estimated income $2-5M+ annually", "NYC-based confirmed in profile, practicing in New York", "20+ years of legal experience puts him at peak earning and wealth accumulation phase (approximately 48-52 years old based on law school timeline)", "M&A specialist at major law firms means significant equity compensation through partnership distributions, carried interest exposure, and deal bonuses", "Cross-border M&A expertise and partnership at global firms (Freshfields, Gibson Dunn) indicates high-profile client work and substantial income"], "why_now_reasons": ["Promoted to Partner at Gibson Dunn in November 2025 - very recent promotion with new wealth influx and equity stake", "Recently transitioned from Freshfields partnership (May 2019 - Nov 2025) to Gibson Dunn partnership - significant career milestone", "First month at Gibson Dunn in new partner role means new tax structures (K-1 income, partnership distributions, potential deferred comp arrangements)", "20+ years of experience suggests accumulation of substantial wealth requiring optimization and succession planning"], "concerns": [], "recommended_outreach_angle": "Congratulate on recent partner promotion at Gibson Dunn; position as expert on tax-efficient wealth structures for newly-elevated M&A partners navigating partnership income, international compensation, and wealth preservation strategies."}, {"name": "Jami Rubin", "current_role": "Senior Managing Director @ Guggenheim Securities", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/jami-rubin", "icp_match_score": 95, "urgency_score": 88, "matched_icp": "high_income_professional", "summary": "Senior Managing Director at Guggenheim Securities with 30 years of investment banking and finance experience, including 10+ years as Partner at Goldman Sachs. NYC-based with significant deal-making expertise in healthcare investment banking and multiple board positions.", "match_reasons": ["Senior Managing Director at Guggenheim Securities - C-suite level compensation estimated $1M-3M+", "Former Goldman Sachs Partner (10+ years) - highest tier of finance income", "NYC-based, confirmed in profile (New York City Metropolitan Area)", "30 years experience in finance/investment banking puts her in peak earning years", "Currently serving as board member and audit committee chair at public biotech company (Relay Therapeutics)", "Healthcare investment banking specialization indicates extensive deal bonus and equity compensation history"], "why_now_reasons": ["Recently promoted to Senior Managing Director at Guggenheim Securities (January 2025) - new role with likely compensation increase", "Transition from Venture Partner role to Managing Director signals new equity stake and income structure", "30 years in finance indicates approaching peak or transition phase; likely managing concentrated positions and accumulated wealth", "Board member at public company - equity compensation and capital gains from that position"], "concerns": ["Profile shows total experience listed as 16 years 11 months, which conflicts with stated 30 years experience - possible data discrepancy", "Currently in early stage of SMD role (started Jan 2025), so may still be ramping up"], "recommended_outreach_angle": "Recognize her promotion to Senior Managing Director and board leadership; position Finvisor as expert in wealth optimization for finance executives managing concentrated equity positions and navigating complex compensation structures from banking partnerships."}, {"name": "Celine Chan", "current_role": "Partner at Weil, Gotshal & Manges LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/celine-chan-747a2b79", "icp_match_score": 94, "urgency_score": 89, "matched_icp": "high_income_professional", "summary": "Employment litigation partner at Weil, Gotshal & Manges LLP with 15 years of experience. Recently promoted to Partner in January 2025. NYC-based with strong legal credentials and peer recognition in litigation.", "match_reasons": ["Partner at Am Law 50 firm - estimated income $1M-3M+ annually", "NYC-based, confirmed in profile (New York, New York)", "15 years total experience with 8+ years as Associate before partnership - typical high-earner trajectory", "Employment litigation specialization at top-tier firm indicates significant legal expertise and client base", "Partner-level compensation includes partnership distributions and equity stake"], "why_now_reasons": ["Promoted to Partner January 2025 - significant income increase and new equity stake in firm", "First year as Partner means complex K-1 income, self-employment taxes, and partnership distributions to manage", "Strong professional recognition (liked posts about litigation awards, women in business recognition) suggests peak earning trajectory"], "concerns": ["Profile shows overlapping employment dates (Partner Jan 2025-Present listed as '11 months' and Counsel Jan 2020-Present listed as '5 years 9 months') - suggests possible data entry inconsistency or role transition timing unclear"], "recommended_outreach_angle": "Congratulate on partnership achievement; offer partnership wealth structuring, tax optimization for K-1 distributions, and concentrated compensation diversification strategies."}, {"name": "Sarah Stasny", "current_role": "Partner and Head of Private Equity Transactions (US) at Proskauer", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/sstasny", "icp_match_score": 95, "urgency_score": 87, "matched_icp": "high_income_professional", "summary": "Senior M&A partner with 21+ years of experience specializing in private equity transactions. Recently promoted to Head of Private Equity Transactions at Proskauer in June 2025. Based in NYC, advising leading PE sponsors on acquisitions, exits, and fund structuring.", "match_reasons": ["Partner at top-tier law firm (Proskauer) - estimated income $1-3M+ annually", "NYC-based, confirmed in profile", "21+ years of experience in high-income practice area with PE clients", "Leadership role as Head of PE Transactions Group - significant compensation and equity stake", "Specialized in M&A and private equity, industries with carried interest and significant deal economics"], "why_now_reasons": ["Promoted to Head of PE Transactions at Proskauer in June 2025 - recent elevation to leadership with increased compensation", "Just completed move from Paul, Weiss (5+ years) to Proskauer, likely involving significant signing bonus and equity", "New leadership position creates need for succession planning and wealth structuring", "PE practice focus means exposure to deal-based income and variable compensation requiring tax optimization"], "concerns": [], "recommended_outreach_angle": "Recognize her recent transition to Proskauer as Head of PE Transactions; offer expertise in structuring partner income, optimizing tax on carried interest, and exit planning for equity partners."}, {"name": "Anisha M.", "current_role": "Managing Director at Blackstone Credit & Insurance", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/anisha-m-8171477", "icp_match_score": 94, "urgency_score": 88, "matched_icp": "high_income_professional", "summary": "Managing Director at Blackstone Credit & Insurance with 19+ years of finance experience. Recently promoted to MD at Blackstone (October 2025) after 4+ years as MD at MidCap Financial. Deep expertise in private credit, leverage finance, and capital markets across tier-one financial institutions.", "match_reasons": ["Managing Director at Blackstone - estimated income $500K-$2M+ annually with equity upside in credit funds", "NYC-based, confirmed in profile (New York, New York)", "19 years and 7 months total experience puts her at peak earning and wealth accumulation years (approximately age 45-50)", "Career progression: VP at Goldman Sachs -> Principal at Apollo -> MD at MidCap -> MD at Blackstone demonstrates elite advancement trajectory", "Exposure to carried interest and fund economics through private credit investment platform", "C-Suite level designation with significant management responsibilities"], "why_now_reasons": ["Promoted to Managing Director at Blackstone in October 2025 - only 2 months into current role, likely onboarding with new comp structure and equity stakes", "Recent move to Blackstone from MidCap represents potential liquidity event and comp restructuring from private to mega-cap alternative manager", "Peak earning years with 19+ year tenure suggests substantial accumulated wealth and increasing estate/wealth preservation needs", "Blackstone role in credit & insurance implies exposure to fund economics and carried interest with significant tax implications"], "concerns": [], "recommended_outreach_angle": "Congratulate on recent move to Blackstone; offer expertise on tax optimization for carried interest and fund economics, plus wealth diversification strategies for managing significant credit fund exposure at a mega-cap manager."}, {"name": "Ashwin Gupta", "current_role": "Partner, Goldman Sachs Growth Equity", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/ashwin-gupta-5897156", "icp_match_score": 94, "urgency_score": 88, "matched_icp": "high_income_professional", "summary": "Partner at Goldman Sachs Growth Equity with 18+ years of investment experience. Recently promoted to Partner in January 2025 after 7+ years as Managing Director. NYC-based fintech and growth equity investor managing substantial deal flow.", "match_reasons": ["Partner at Goldman Sachs - estimated income $2-5M+ based on compensation structure", "NYC Metropolitan Area based, confirmed in profile", "18 years and 8 months total experience puts him at peak earning and wealth accumulation years (estimated age 40-45)", "Senior investor role with equity upside and carried interest exposure through growth equity investments", "Finance industry specialist with deep deal experience and portfolio management responsibilities"], "why_now_reasons": ["Promoted to Partner January 2025 - significant income increase and new equity stake at firm", "First month as Partner means new tax complexity (K-1 income, partnership distributions, alternative minimum tax considerations)", "18+ year tenure at Goldman Sachs suggests wealth concentration risk and need for diversification beyond GS equity", "Growth equity focus creates concentrated investment exposure requiring portfolio rebalancing strategy"], "concerns": [], "recommended_outreach_angle": "Congratulate on partnership elevation; position Finvisor as trusted advisor for tax optimization around partnership distributions, concentrated equity diversification strategy for GS holdings, and alternative investment portfolio construction for growth equity professionals."}, {"name": "Jason Krochak", "current_role": "Partner - Corporate; Sports at Kirkland & Ellis LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/jason-krochak-4562b81a", "icp_match_score": 94, "urgency_score": 87, "matched_icp": "high_income_professional", "summary": "Partner at Kirkland & Ellis LLP with 13.5 years of experience specializing in corporate and sports law. Recently promoted to Partner at K&E in October 2025 (2 months ago). NYC-based with Harvard Law degree and extensive deal experience across acquisitions, joint ventures, and financings.", "match_reasons": ["Partner at AmLaw #1 firm (Kirkland & Ellis) - estimated income $2M-4M+ with partner equity stake", "NYC-based, confirmed in profile - New York, NY", "13.5 years total experience in high-level corporate law practice", "Harvard Law School graduate (cum laude) - top-tier legal credentials", "Multiple prestigious recognitions: Forbes America's Top Lawyers 2025, Chambers USA, Lawdragon 500, Sports Business Journal Forty Under 40 Hall of Fame", "Specialized in high-value transactions: M&A, joint ventures, league expansions, financings with institutional clients (PE firms, sports teams, financial institutions)"], "why_now_reasons": ["CRITICAL TIMING: Promoted to Partner at Kirkland & Ellis in October 2025 (only 2 months ago) - significant income jump with new K-1 income and partnership equity", "New Partner at elite firm means heightened tax complexity (carried interest, K-1 allocations, self-employment tax planning)", "Recent recognition as 'Power Players Sport Sector 2025' and 'Forbes America's Top Lawyers 2025' (Nov 2025) indicates peak earning/visibility phase", "Deal flow visibility suggests concentrated compensation risk and need for diversification strategy", "Strong institutional clients (PE firms, professional sports teams) indicates high-income trajectory"], "concerns": [], "recommended_outreach_angle": "Congratulate Jason on his recent Partnership promotion at K&E; position Finvisor as specialists in wealth structure optimization for newly-promoted law partners, focusing on K-1 tax planning, equity diversification from law firm ownership, and long-term wealth preservation strategies."}, {"name": "Peter Isajiw", "current_role": "Partner at Clifford Chance", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/peter-isajiw", "icp_match_score": 94, "urgency_score": 87, "matched_icp": "high_income_professional", "summary": "Securities litigation and regulatory enforcement partner with 24 years of experience at top-tier law firms. Recently promoted to Partner at Clifford Chance (February 2025) after 9+ years as Partner at King & Spalding. NYC-based specialist in high-stakes commercial and securities litigation.", "match_reasons": ["Partner at Clifford Chance (AmLaw Global 100 firm) - estimated income $1.5M-3M+", "NYC-based, confirmed in profile (New York, New York)", "24 years of legal experience in securities and regulatory practice - peak earning years", "Specialization in complex commercial, securities litigation, and regulatory enforcement suggests significant partner compensation and carry"], "why_now_reasons": ["Promoted to Partner at Clifford Chance in February 2025 - recent move signals new equity stake and income restructuring", "Transition from King & Spalding (9.7 years as partner) to Clifford Chance indicates lateral move with likely better economics", "Partner status at major global law firm with significant client base means current deal flow and regulatory work generating substantial K-1 income"], "concerns": ["Profile lacks specific information on current wealth/AUM", "No explicit mention of tax planning needs or open-to-work signals"], "recommended_outreach_angle": "Congratulate on partnership at Clifford Chance; emphasize tax optimization strategies for partner income transitions between firms and multi-jurisdictional regulatory practice."}, {"name": "Adele Hogan", "current_role": "Partner at Broadfield", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/adele-hogan", "icp_match_score": 95, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Adele Hogan is an accomplished transactional attorney with 26+ years of experience in mergers, capital markets, securities, and regulatory law. Recently promoted to Partner at Broadfield (June 2025) while maintaining director roles at two Nasdaq-listed companies. NYC-based with substantial partnership compensation and multi-entity wealth complexity.", "match_reasons": ["Partner at law firm with AmLaw-tier experience - estimated income well above $500K-$1M+ range", "NYC-based, confirmed in profile", "26+ years of experience in high-value legal practice (mergers, IPOs, SPACs, securities, derivatives)", "Director at two Nasdaq public companies (2022-present) with director compensation and equity stakes", "Leadership roles (Partner, Co-Head of Corporate & Securities, Chair positions) demonstrate executive-level status"], "why_now_reasons": ["Promoted to Partner at Broadfield (June 2025) - recent career transition with new partnership agreement and equity stake", "Active director roles at public companies create concentrated equity exposure requiring diversification strategy", "26 years of accumulated wealth from multiple partnership positions at top-tier firms (White & Case, Linklaters, Cravath) indicates substantial assets requiring wealth management", "Career trajectory suggests approaching peak earning years with tax complexity from K-1 distributions, director compensation, and potential carried interests"], "concerns": [], "recommended_outreach_angle": "Congratulate Adele on her partnership elevation at Broadfield; offer specialized tax optimization and wealth diversification strategies for accomplished legal professionals with multi-entity partnerships, director roles, and complex compensation structures."}, {"name": "Dan Parant", "current_role": "Managing Director, Global Head of Private Wealth Solutions at Vista Equity Partners and Co-President of VistaOne", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/dan-parant-79407320", "icp_match_score": 95, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Managing Director and Co-President at Vista Equity Partners with 21 years of experience in private wealth, private equity, and financial services. Recently joined Vista in February 2024 after 12 years as Co-Head of Americas Private Wealth at KKR. NYC-based executive leading global private wealth solutions.", "match_reasons": ["Managing Director title at top-tier private equity firm (Vista Equity Partners) - estimated income $1M-3M+", "NYC-based, confirmed in profile", "21 years of experience in elite financial services firms (KKR, Lehman Brothers, Neuberger Berman) - well above 15+ year threshold", "Led team of 50+ executives at KKR; now Co-President of VistaOne - exceptional seniority and leadership", "Deep expertise in private markets, wealth management, and alternative investments - high net worth individual and advisor to UHNW clients"], "why_now_reasons": ["Joined Vista Equity Partners in February 2024 - major career transition and role change", "Promoted from Managing Director/Co-Head at KKR to Global Head and Co-President role at Vista - significant elevation and new compensation structure", "Transition to new firm likely involved significant equity stake and new equity compensation arrangements", "21 years at elite firms suggests prime wealth accumulation and estate planning phase (estimated age 42-48 based on 2004 graduation)"], "concerns": [], "recommended_outreach_angle": "Congratulate on Vista transition and Co-President elevation; offer guidance on wealth structuring strategies for high-equity-compensation executives and private market diversification beyond Vista's portfolio."}, {"name": "Nicole Pullen Ross", "current_role": "Partner | Northeast Region Head of Private Wealth Management | Head of Sports & Entertainment Solutions at Goldman Sachs", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/nicole-pullen-ross-82b3478", "icp_match_score": 95, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Senior Partner at Goldman Sachs managing the Northeast Private Wealth Management region with 29+ years of experience. Recently promoted to region head role (Feb 2025). NYC-based wealth management executive serving ultra-high-net-worth individuals and families.", "match_reasons": ["Partner at Goldman Sachs Private Wealth Management - estimated income $1M-5M+ including partnership distributions", "NYC-based, confirmed in profile with current role managing Northeast region", "29+ years total experience puts her at peak earning and wealth accumulation phase (approximately 55-60 years old)", "Senior leadership role as Region Head managing substantial AUM and client relationships", "Advises high-net-worth individuals and families on wealth strategies - ideal referral source and prospect"], "why_now_reasons": ["Promoted to Northeast Region Head role in February 2025 - new leadership responsibility and likely compensation increase", "Led launch of Sports & Entertainment Solutions in 2018, now expanding (growing division suggests equity upside)", "29+ years at firm suggests approaching peak career stage; likely considering personal wealth optimization and legacy planning", "Board positions (Charter School Growth Fund, Hampton University) indicate substantial personal wealth and philanthropic interests"], "concerns": [], "recommended_outreach_angle": "Congratulate on Northeast region leadership promotion; offer premium wealth consolidation and tax strategy services designed specifically for C-suite leaders managing multi-million dollar portfolios alongside partnership equity."}, {"name": "Nirav Shah", "current_role": "Partner at EQT Infrastructure", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/nirav-shah-45854111", "icp_match_score": 94, "urgency_score": 86, "matched_icp": "high_income_professional", "summary": "Infrastructure investment Partner at EQT Group with 16+ years of finance experience. Promoted to Partner in February 2023. NYC-based specialist in infrastructure deal origination and asset management with exposure to significant carried interest and deal economics.", "match_reasons": ["Partner at EQT Group - estimated income $1M-3M+ annually with carried interest on infrastructure fund", "NYC-based (New York, New York confirmed)", "16+ years experience in finance, typical age range 38-42, prime wealth accumulation phase", "Infrastructure fund focus means significant carried interest, deal bonuses, and equity upside from portfolio companies"], "why_now_reasons": ["Promoted to Partner in February 2023 - approximately 2 years into partnership with compounding carried interest", "Recent infrastructure fund activity (portfolio companies like Lumos Networks, Spirit Communications generating returns)", "Senior leadership role managing portfolio with significant AUM suggests meaningful wealth concentration in fund positions"], "concerns": ["Profile shows limited public activity/updates; no recent LinkedIn posts or career announcements to confirm current status", "Carried interest structure may not mature for several years depending on fund exit timeline"], "recommended_outreach_angle": "Recognize his infrastructure fund leadership and offer specialized guidance on concentrated wealth management for PE/infrastructure partners, including carried interest diversification and tax-efficient wealth transfer strategies."}, {"name": "Andrea Gede-Lange", "current_role": "Corporate Partner - Private Equity at Clifford Chance", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/andrea-gede-lange-467344b5", "icp_match_score": 94, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Corporate Partner specializing in M&A and private equity at Clifford Chance, with 20+ years of experience. Recently promoted to Corporate Partner at Clifford Chance in September 2025 after 9+ years as Partner at Fried Frank. NYC-based with deep expertise in cross-border private equity transactions.", "match_reasons": ["Partner at elite AmLaw firm (Clifford Chance) - estimated income $2-5M+", "NYC-based, confirmed in profile at Clifford Chance New York office", "20 years and 3 months total experience, puts her at 43-48 years old (prime wealth accumulation phase)", "M&A and Private Equity specialization means exposure to carried interest, deal bonuses, and partnership distributions", "C-Suite level designation at Fried Frank confirms senior partner status"], "why_now_reasons": ["Recently promoted to Corporate Partner at Clifford Chance in September 2025 (4 months ago) - significant income step-up and new equity stake", "Transition between elite firms indicates major career event and potential wealth restructuring", "20+ years in private equity law suggests substantial accumulated wealth and peak earning years", "Partner at two AmLaw 100 firms suggests compensation complexity requiring specialized wealth planning"], "concerns": [], "recommended_outreach_angle": "Congratulate on new partner role at Clifford Chance; offer expert guidance on optimizing compensation structure across new partnership stake, carried interest management, and tax-efficient wealth accumulation strategies for senior M&A partners."}, {"name": "David Herman", "current_role": "Partner, Real Estate at Cleary Gottlieb Steen & Hamilton LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/david-herman-2250a52", "icp_match_score": 94, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Real Estate Partner at Cleary Gottlieb (AmLaw #1 firm) with 24+ years of experience. Recently promoted to Partner at Cleary in February 2025 after 1.5 years as Co-Head of US Real Estate at McDermott Will & Emery. NYC-based with extensive experience in high-value real estate transactions, private equity deals, and capital markets.", "match_reasons": ["Partner at Cleary Gottlieb Steen & Hamilton LLP - AmLaw #1 firm, estimated annual income $1M-3M+", "NYC-based, confirmed in profile (New York, New York)", "24+ years of legal experience puts him at approximately 48-52 years old, prime wealth accumulation phase", "Real estate practice specializing in M&A, private equity, and capital markets - exposure to carried interest, deal bonuses, and partnership distributions", "Advised on transactions totaling $100+ billion, indicating high-profile client work and substantial deal-based compensation"], "why_now_reasons": ["Recently promoted to Partner at Cleary Gottlieb in February 2025 - represents significant income increase and new K-1 partnership equity", "First few months as Partner at new firm creates urgency around tax planning, retirement account structuring, and wealth management", "24+ years of consistent partner-track experience suggests accumulated wealth and need for sophisticated wealth preservation strategies", "Currently represents major PE clients (Blackstone, Brookfield, etc.) with active deal flow, indicating strong current and future compensation"], "concerns": [], "recommended_outreach_angle": "Congratulate on recent transition to Cleary; position expertise in tax optimization and wealth structuring for high-earning partners navigating K-1 income complexity and partnership equity planning."}, {"name": "James Menapace", "current_role": "Principal & Founder at JEM | C3", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/jamesmenapace", "icp_match_score": 94, "urgency_score": 85, "matched_icp": "business_owners_exits", "summary": "Founder of M&A advisory firm JEM | C3 with 24+ years of experience including 2 years at Goldman Sachs investment banking and multiple senior corporate development roles. NYC-based with deep expertise in M&A strategy, deal execution, and post-merger integration.", "match_reasons": ["Founder and Principal of JEM | C3 - owns and operates M&A advisory business", "NYC-based, confirmed in profile and company operations", "24+ years total experience with progression through Goldman Sachs, Pearson, Cognizant, and multiple head-of-corporate-development roles", "Senior-level roles (VP, SVP, Head) at large enterprises demonstrate high income trajectory and business acumen", "M&A expertise and track record suggest access to exits, acquisitions, and liquidity events"], "why_now_reasons": ["Founded JEM | C3 in January 2025 - recent business launch creates immediate need for tax planning and business structure optimization", "Transition from corporate employment to business ownership represents significant income restructuring and equity concentration", "As a business owner advising others on M&A, likely has substantial carried interest, deal success fees, and variable income requiring sophisticated planning", "24+ years career suggests age 45-55 range, potentially approaching wealth transition and succession planning phase"], "concerns": ["Exact age not provided - only graduation year (1999 from college) suggests approximate age 45-48, within prime accumulation range", "Business is advisory/service-based rather than equity-heavy, so less traditional exit/liquidity event trigger than product company founder"], "recommended_outreach_angle": "Congratulate on launching JEM | C3; offer guidance on wealth structuring for business owners managing variable deal income, entity optimization for M&A advisory partnerships, and succession planning for high-net-worth operators."}, {"name": "Scott Daubin", "current_role": "Senior Partner at Bain & Company", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/scottdaubin", "icp_match_score": 94, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Senior Partner at Bain & Company with 17 years of experience, recently promoted to Senior Partner in July 2025. NYC-based strategy consultant with Harvard MBA and Princeton undergraduate degree. Active investor through HBS Alumni Angels and former New York Angels member.", "match_reasons": ["Senior Partner at Bain & Company - top-tier consulting firm, estimated income $1-3M+ annually plus partnership distributions", "NYC-based, confirmed in profile with 500+ LinkedIn connections and significant professional network", "17 years at Bain demonstrates seniority and career stability; likely in peak earning and wealth accumulation phase", "Harvard MBA and Princeton undergraduate suggest high-earning trajectory and institutional pedigree", "Active investor (HBS Alumni Angels, New York Angels) indicates significant liquid capital and investment mindset"], "why_now_reasons": ["Promoted to Senior Partner July 2025 - only 3 months ago, represents significant income and equity stake increase", "New partnership tier likely brings new tax complexity (K-1 income, self-employment taxes, profit distributions)", "17 years at Bain suggests peak career status; approaching wealth preservation and tax optimization phase", "Active angel investor signals accumulated wealth ready for diversification and structured planning"], "concerns": [], "recommended_outreach_angle": "Congratulate on Senior Partner elevation; position Finvisor as specialized advisor for high-net-worth consulting partners managing concentrated Bain equity stakes, optimizing partnership distributions, and diversifying through structured wealth strategies."}, {"name": "Scott Schulte", "current_role": "Managing Director - Global Co-Head of Investment Grade Debt Syndicate at Barclays", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/scott-schulte-1309405", "icp_match_score": 94, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Senior debt capital markets executive at Barclays with 20+ years of experience in investment grade debt syndication and trading. Recently promoted to Global Co-Head in March 2025, managing major syndicate operations. NYC-based with proven track record leading 800+ mandates totaling ~$1.5 trillion.", "match_reasons": ["Managing Director at Tier-1 investment bank (Barclays) - estimated annual income $1-3M+ including bonus and equity", "NYC-based, confirmed in profile with all experience in New York", "20+ years total experience in capital markets, currently in peak earning years at age ~42-45", "Senior leadership role managing global syndicate operations with 5,000+ connections indicating extensive network and influence"], "why_now_reasons": ["Promoted to Global Co-Head of Investment Grade Debt Syndicate in March 2025 - recent elevation with new equity stake and compensation", "Significant platform expansion: moved from US Head role to Global Co-Head, suggesting major income jump", "Active in market commentary (Bloomberg, Reuters appearances in late 2025) indicating profile visibility and potential personal brand monetization", "21 years at Barclays/Citi combined suggests accumulated wealth and financial complexity requiring optimization"], "concerns": ["Profile does not explicitly mention personal net worth, equity holdings, or deferred compensation details", "Limited visibility into outside investments, board positions, or other wealth indicators beyond primary employment", "No mention of 'open to work' or transition signals - appears highly engaged at current role"], "recommended_outreach_angle": "Recognize recent Global Co-Head promotion at Barclays; discuss tax optimization strategies for managing director-level compensation (bonus structuring, equity vesting), portfolio diversification for concentrated financial services exposure, and succession/wealth transition planning given 20+ year career trajectory."}, {"name": "Wendy Li", "current_role": "Managing Director at Bank of America Private Bank", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/wendy-li-10588534", "icp_match_score": 94, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Managing Director and Senior Private Client Advisor at Bank of America Private Bank with 30 years of experience in wealth management and private banking. Recently promoted to Managing Director (April 2024) from SVP role at City National Bank. Based in NYC/Greenwich, specializes in advising HNW and ultra-HNW individuals, families, and family offices.", "match_reasons": ["Managing Director at Bank of America Private Bank - C-suite level role at major financial institution, estimated income $500K-$2M+", "NYC-based (primary location New York, NY with secondary in Greenwich, CT)", "30 years of experience puts her at age 56-60, in prime wealth management and pre-retirement stage", "Extensive background in private banking, estate planning, trust & estate services, and investment management indicates deep financial expertise", "Managed HNW and ultra-HNW clients including private equity and hedge fund principals - demonstrates high-net-worth client relationships", "Advanced financial credentials: CPA, FINRA Series 7 & 63 licensed, MBA from NYU Stern"], "why_now_reasons": ["Promoted to Managing Director in April 2024 - represents significant career milestone and likely compensation increase", "30 years in industry suggests approaching peak earning years and potential retirement planning consideration", "Recent transition from City National Bank (RBC) to Bank of America (April 2024) - role change may trigger wealth reorganization", "Managing Director role with C-suite designation indicates substantial equity stake and deferred compensation considerations"], "concerns": ["Work location split between Greenwich, CT and NYC may complicate service delivery depending on primary residence", "Current role already involves wealth management expertise - may already have sophisticated financial advisor relationships in place"], "recommended_outreach_angle": "Recognize her elevation to Managing Director and offer specialized tax optimization and concentrated wealth strategies for executives with complex compensation structures and multi-state considerations."}, {"name": "Danielle Comanducci", "current_role": "Counsel at Smith, Gambrell & Russell, LLP", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/danielle-comanducci-4348a6ba", "icp_match_score": 88, "urgency_score": 92, "matched_icp": "high_income_professional", "summary": "Counsel at Smith, Gambrell & Russell, LLP with 8+ years of legal experience. Elected to Partner effective January 1, 2026 - a major promotion announced in firm's recent partner election announcements. NYC-based attorney with bilingual capabilities (English/French).", "match_reasons": ["Promoted to Partner effective January 1, 2026 - significant income jump and equity stake in mid-size law firm", "NYC-based, located in New York City Metropolitan Area", "Smith, Gambrell & Russell is a 501-1000 person partnership law firm founded 1893 - established, prestigious firm", "Legal career spans 8+ years with progression from Associate to Counsel to Partner", "Partner income at established law firm typically $300K-$1M+ annually"], "why_now_reasons": ["Elected to Partner effective January 1, 2026 - imminent transition (timing from search query matches)", "Partner election represents significant income increase and new K-1 tax complexity requiring wealth advisory", "First year as Partner means new financial planning needs: equity distributions, retirement planning, tax optimization", "Career milestone suggests peak earning years ahead with partnership equity compounding"], "concerns": ["Profile lists current role as 'Counsel' but promotion to Partner is effective January 1, 2026 - profile may not be fully updated yet", "Limited information on specific practice area or revenue-generating role (profile shows Legal/Specialist level)", "No explicit signals about outside investments, concentrated wealth, or estate planning needs"], "recommended_outreach_angle": "Congratulate on partnership election effective January 1, 2026; position Finvisor as partners specializing in tax-efficient wealth management for newly promoted law firm partners navigating K-1 distributions and partnership equity."}, {"name": "Ian Goldberg", "current_role": "CEO of Signature Media", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/ian-goldberg-ba99b18b", "icp_match_score": 88, "urgency_score": 92, "matched_icp": "business_owners_exits", "summary": "Serial entrepreneur and founder with 36+ years of experience. Recently exited iSport360 to Signature Athletics in August 2025 and now serves as CEO of Signature Media, the content-to-commerce division. NYC-based with proven track record of building and scaling businesses.", "match_reasons": ["Founded and exited iSport360 in August 2025 - textbook liquidity event for business owner", "Currently CEO of Signature Media (51-200 employees), demonstrating scale and ongoing leadership", "36+ years of business experience including multiple founder/CEO roles and acquisitions", "NYC-based (New York City Metropolitan Area confirmed)", "Prior experience as President of family business (Samian Sales LLC) showing business ownership history", "Multiple business exits in career history (i33 communications, iSport360) demonstrating exit sophistication"], "why_now_reasons": ["Major exit event: iSport360 acquired by Signature Athletics in August 2025 - liquidity event creates immediate wealth planning needs", "Recently promoted to CEO of Signature Media (September 2025) - equity stake in new venture likely part of acquisition deal", "First liquidity event in ~6 years (iSport360 founded March 2019) - post-acquisition tax planning and wealth management urgency", "Prior business exit experience suggests understanding of post-acquisition strategies and investment needs", "Age and career stage (36+ years experience, likely 50s) suggests succession planning and wealth preservation focus"], "concerns": ["Current role is CEO of newly formed division rather than independent business owner - may have equity lockup or earnout provisions", "iSport360 was relatively small company (11-50 employees) - acquisition proceeds may be modest compared to target ICP", "LinkedIn activity limited - unclear net worth or asset level post-acquisition"], "recommended_outreach_angle": "Congratulate on the iSport360 acquisition to Signature Athletics; offer specialized guidance on post-exit wealth optimization, tax strategy for equity proceeds, and diversification planning for serial entrepreneurs managing multiple business interests."}, {"name": "Jordan Plosky", "current_role": "Co-Founder & CEO of Zoop (Acquired)", "location": "New York", "linkedin_url": "https://linkedin.com/in/jordanplosky", "icp_match_score": 88, "urgency_score": 92, "matched_icp": "business_owners_exits", "summary": "Co-Founder and CEO of Zoop, a company that was acquired. Entrepreneur with expertise in business development, strategic partnerships, and sales & marketing. Recent exit presents significant wealth event and planning opportunity.", "match_reasons": ["Co-Founder & CEO of acquired company - exact match for ICP 1: Business Owners", "NYC-based, sourced from 'acquisition founder CEO New York' query", "Acquisition indicates business sale, primary wealth event that drives wealth management needs", "Background in business development and strategic partnerships suggests business scale and sophistication"], "why_now_reasons": ["Recent company acquisition - immediate trigger for wealth planning and tax optimization", "Post-exit liquidity event creates urgent need for capital deployment strategy", "Likely holding proceeds from acquisition; needs guidance on diversification and wealth preservation", "Exit creates estate planning and next venture planning opportunities"], "concerns": ["Limited profile information available - unable to confirm exact age, acquisition details, or acquisition valuation", "Headline information truncated; unable to confirm company size pre-exit or employee count", "Location inferred from search query but not explicitly confirmed in provided profile data"], "recommended_outreach_angle": "Reach out to congratulate on successful exit and offer strategic guidance on post-acquisition wealth management, tax optimization, and diversification of proceeds - especially relevant for entrepreneurs looking to protect and grow newly acquired capital."}, {"name": "Roger Singer", "current_role": "Partner and Global Co-Chair, Investment Funds Practice Group at Gibson, Dunn & Crutcher LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/roger-singer-695812124", "icp_match_score": 95, "urgency_score": 82, "matched_icp": "high_income_professional", "summary": "Senior M&A and private funds partner at Gibson Dunn with 29+ years of experience. Elevated to Global Co-Chair of Investment Funds Practice in August 2025. NYC-based specialist in private equity, real estate, and infrastructure fund formation.", "match_reasons": ["Global Co-Chair at Am Law 50 firm (Gibson Dunn) - estimated income $3-8M+", "NYC-based, confirmed in profile", "29+ years of experience puts him in peak earning phase (likely age 50-60)", "Private funds practice means carried interest, deal bonuses, and partnership distributions", "Specializes in PE/real estate/infrastructure - high-value client relationships and transaction fees"], "why_now_reasons": ["Promoted to Global Co-Chair of Investment Funds Practice in August 2025 - significant elevated platform and visibility", "First few months in expanded Co-Chair role means new compensation structure and equity/distribution adjustments", "29+ years at major law firms suggests approaching later career wealth consolidation phase", "Infrastructure/real estate fund focus positions him in growing asset class with significant capital flows"], "concerns": [], "recommended_outreach_angle": "Recognize his elevation to Global Co-Chair; offer perspective on wealth concentration planning for partners with multi-year carried interest positions and strategies for optimizing tax-efficient capital deployment across real estate and infrastructure platforms."}, {"name": "Young Kwon", "current_role": "Founder and Managing Partner at Antero Capital Partners", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/young-kwon-2712237", "icp_match_score": 95, "urgency_score": 82, "matched_icp": "business_owner", "summary": "Founder and Managing Partner of Antero Capital Partners, a NYC-based real estate private equity firm. With 28+ years of experience in commercial real estate, institutional investment, and finance leadership, he's a seasoned entrepreneur transitioning from managing director roles at major firms (Apollo, Atalaya) to building his own platform.", "match_reasons": ["Founder and Managing Partner of established real estate PE firm - clear business ownership at C-suite level", "NYC-based, confirmed as headquartered in New York with 28+ years experience", "Exit experience: Previously Head of Real Estate at Atalaya (institutional firm) and Managing Director at Apollo - signals previous wealth accumulation and institutional experience", "Real estate PE focus indicates exposure to concentrated equity positions, carried interest, and deal economics typical of high-net-worth business owners", "Age inference: 28+ years of experience suggests mid-50s, ideal wealth management demographic"], "why_now_reasons": ["Founded Antero Capital Partners in September 2023 - recently transitioned from employee role to founder/owner, likely significant compensation restructuring", "New platform formation means equity concentration in growing firm with capital deployment; classic liquidity event trigger", "At founder/managing partner stage, now managing institutional capital with carried interest and GP equity stakes", "Career inflection point: Moved from large institutional firms to own vehicle, suggesting wealth optimization needs around entity structure, compensation, and tax planning"], "concerns": [], "recommended_outreach_angle": "Congratulate on Antero's launch; position our firm as ideal partner for managing founder equity, carried interest diversification, and tax optimization for new PE sponsors navigating growth capital deployment."}, {"name": "Carlo Argila", "current_role": "2x Exited Founder | Startup Advisor & Investor", "location": "New York City Metropolitan Area, New York", "linkedin_url": "https://linkedin.com/in/carlo-argila-2b2227199", "icp_match_score": 92, "urgency_score": 85, "matched_icp": "business_owners_exits", "summary": "Serial entrepreneur with 29+ years of experience and two confirmed exits (FLAUNT acquired Dec 2024, National Energy Audits acquired 2011). Built and scaled multiple 8-figure businesses from startup to acquisition, now advising and investing. NYC-based with extensive capital raising and M&A experience.", "match_reasons": ["2x confirmed founder exits with demonstrated ability to build and sell businesses", "Most recent exit: FLAUNT acquired December 2024 - likely significant liquidity event with potential stock/earnout proceeds", "Built 8-figure revenue companies (National Energy Audits grew to 150+ employees, FLAUNT known for multiple press features and brand value)", "29+ years entrepreneurial experience across multiple industries (real estate, energy, consumer products, tech)", "NYC-based (Brooklyn, New York confirmed; multiple roles in Greater NYC Area)", "Current investor/advisor role suggests significant capital available and ongoing wealth management needs"], "why_now_reasons": ["FLAUNT acquisition completed December 2024 - very recent liquidity event (within 2 months)", "Recent exit means new tax planning urgency (capital gains, potential earnout structure, re-investment of proceeds)", "Age 48-52 inferred from 1991 graduation - peak wealth accumulation phase, likely preparing for long-term wealth preservation", "Current advisor/investor role suggests managing multiple investments requiring diversification and tax optimization"], "concerns": [], "recommended_outreach_angle": "Congratulate on FLAUNT acquisition; offer expertise on post-exit tax planning, capital gains optimization, and diversified investment strategy for multiple portfolio companies and future ventures."}, {"name": "Andrew Freeman", "current_role": "Founder and Managing Partner at Brickett Point Investments, LLC", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/andrew-freeman-a13abb16", "icp_match_score": 94, "urgency_score": 82, "matched_icp": "business_owners_exits", "summary": "Seasoned PE investor and founder with 27+ years in private equity and family office investing. Recently launched Brickett Point Investments in December 2024, managing $5-20M investments in finance-to-entrepreneur platforms. NYC-based with strong track record (3x+ MOIC) and extensive network across PE, family offices, and entrepreneurs.", "match_reasons": ["Founder and Managing Partner of own investment firm - classic business owner/founder profile", "NYC-based confirmed in profile - meets geographic requirement", "27+ years investment career with 3x+ MOIC track record indicates substantial wealth accumulation", "Currently managing own fund (BPI) with significant AUM and active portfolio companies", "Multiple board positions at portfolio companies (Dogtopia, Clearly Canadian, Garnett Reynolds) demonstrate wealth and control", "Managing Director at FM Capital Holdings (family office joint venture) shows family office/high-net-worth connections"], "why_now_reasons": ["Launched Brickett Point Investments December 2024 - very recent business transition and new venture", "Recent founder event represents significant life stage change and new financial complexity", "As new fund founder, likely navigating personal wealth structuring, estate planning, and tax optimization for new entity", "Multiple portfolio companies require ongoing wealth management and potential exit planning support"], "concerns": ["Previous career heavily based in San Francisco (Paine & Partners 2005-2016, H.I.G. Capital 2017-2018) - only recently moved to NYC for BPI in 2024", "As PE investor himself, may already have sophisticated financial advisory team in place", "Focus is primarily on deploying capital into other companies rather than personal wealth optimization"], "recommended_outreach_angle": "Congratulate on BPI launch; position Finvisor as a partner to help structure personal wealth and estate planning as the fund grows, particularly for managing concentrated positions across portfolio companies and optimizing the fund's GP carried interest structure."}, {"name": "Daniel Litowitz", "current_role": "Partner, Deputy Co-Head, US M&A at A&O Shearman", "location": "New York City Metropolitan Area, US", "linkedin_url": "https://linkedin.com/in/daniel-litowitz-72b7b88", "icp_match_score": 94, "urgency_score": 82, "matched_icp": "high_income_professional", "summary": "M&A Partner and Deputy Co-Head at A&O Shearman with 27+ years of experience. Recently promoted to Deputy Co-Head of US M&A in May 2024. NYC-based partner handling major transactions including private equity and corporate M&A deals.", "match_reasons": ["Partner at AmLaw top-tier firm (A&O Shearman) - estimated income $1.5M-3M+ annually", "NYC-based confirmed in profile, covers New York City Metropolitan Area", "27+ years of legal experience with established partner status", "Deputy Co-Head role indicates senior leadership position and significant earning potential", "M&A practice with exposure to private equity transactions, deal bonuses, and carried interest opportunities"], "why_now_reasons": ["Promoted to Deputy Co-Head of US M&A in May 2024 - approximately 7 months ago, recent elevation with increased responsibilities and compensation", "New leadership role suggests increased complexity in tax and wealth structuring (partnership equity, profit distributions)", "Active engagement in major transactions (Asahi Group $2.3B deal visibility) indicates strong deal flow and bonus potential", "27+ years at firm (with brief London stint 2001-2002) suggests peak earning years and potential retirement planning horizon within 5-10 years"], "concerns": ["Career duration shows long tenure which may indicate lower mobility, but strong wealth accumulation likely over 27+ years"], "recommended_outreach_angle": "Congratulate on recent promotion to Deputy Co-Head; offer strategic insights on tax optimization for partner-level income, profit distributions, and long-term wealth planning as he approaches the later stages of his career at the firm."}, {"name": "Jeff Berger", "current_role": "Operating Partner at FJ Labs", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/jeffreysberger", "icp_match_score": 94, "urgency_score": 82, "matched_icp": "business_owners_exits", "summary": "Serial entrepreneur and founder of Talent Inc. (Career.io), which was acquired by BV Investment Partners in a nine-figure transaction with 7-16x returns for investors. Currently Operating Partner at FJ Labs, a top-tier venture capital firm with 600+ portfolio companies and 40+ unicorns. Based in NYC with 17 years of experience.", "match_reasons": ["Founder and ex-CEO of Talent Inc., a business he scaled to 51-200 employees over 7 years before successful PE acquisition", "Nine-figure exit with exceptional returns (7-16x) demonstrates significant wealth creation and liquidity event", "NYC-based, confirmed in profile multiple times", "Operating Partner at FJ Labs positions him in venture capital and investor network, typical post-exit trajectory for successful founders", "Multiple founder experiences (KODA, Doostang, Career.io) show serial entrepreneur profile", "YPO Member and Chapter Chair indicates peer network of high-net-worth individuals"], "why_now_reasons": ["Recent exit of Talent Inc. (January 2021) resulted in significant liquid wealth from nine-figure transaction", "Now 3+ years post-exit, likely managing capital gains taxes and structuring post-acquisition wealth", "Operating Partner role since May 2022 suggests new income streams from carried interest and deal economics", "At Operating Partner level in VC, likely earning performance fees and carried interest requiring sophisticated tax planning", "Serial entrepreneur with multiple exits suggests accumulated capital requiring wealth preservation strategies"], "concerns": ["Currently focused on venture capital/investing rather than traditional wealth management client profile", "May already have sophisticated financial/legal advisors given VC Operating Partner status", "Profile does not indicate current estate planning needs or family wealth transition signals"], "recommended_outreach_angle": "Congratulate on Talent Inc. exit and FJ Labs partnership; position as specialized advisor for post-exit founders managing liquidity, carried interest taxation, and portfolio diversification beyond venture investments."}, {"name": "Karen Scanna", "current_role": "Partner at Hogan Lovells US LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/karen-scanna-80b0476", "icp_match_score": 94, "urgency_score": 82, "matched_icp": "high_income_professional", "summary": "Real estate partner at Hogan Lovells with 29+ years of legal experience, specializing in complex commercial real estate transactions for developers and institutional clients in NYC. Recently moved to Hogan Lovells in November 2023 after 27 years at Stroock & Stroock & Lavan, a nationally recognized attorney listed in Best Lawyers, Chambers USA, and Super Lawyers.", "match_reasons": ["Partner at major law firm (Hogan Lovells) - estimated income $1M-3M+", "NYC-based confirmed, extensive real estate practice across Manhattan developments", "29+ years experience at senior level, age estimated mid-50s, prime wealth accumulation phase", "Track record with high-net-worth clients (Silverstein Properties, Citi, major NYC developers) suggests exposure to carried interest and transaction bonuses"], "why_now_reasons": ["Recent lateral move to Hogan Lovells in November 2023 - represents career transition and likely restructuring of compensation", "Firm merger activity (Hogan Lovells + Cadwalader announced in recent activity feed) creates tax complexity and potential wealth events", "Deep involvement in major NYC commercial real estate transactions suggests concentrated real estate holdings and liquidity planning needs"], "concerns": ["Career transition to Hogan Lovells now 14 months old, so immediate post-move urgency may have passed", "No explicit signals of recent promotion, equity event, or retirement planning in available data"], "recommended_outreach_angle": "Acknowledge her prominence in NYC real estate law and recent lateral move; offer specialized insight on wealth diversification for real estate-focused attorneys with concentrated holdings and partner equity planning."}, {"name": "Michael Kuh", "current_role": "Partner & New York Managing Partner at Hogan Lovells", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/michael-kuh-6b72337", "icp_match_score": 94, "urgency_score": 82, "matched_icp": "high_income_professional", "summary": "Partner and Managing Partner of Hogan Lovells' New York office specializing in high-stakes M&A, private equity, and sports/entertainment law. With 21+ years of experience and significant client portfolio including major sports franchises and institutional investors, he represents the firm's leadership and deal-making elite.", "match_reasons": ["Partner at AmLaw 50 firm (Hogan Lovells) - estimated income $1.5M-4M+ given Managing Partner status", "NYC-based confirmed - Managing Partner of NY office", "21+ years experience puts him at peak earning and wealth accumulation years (likely 48-55 age range)", "High-stakes M&A, PE, and venture capital practice indicates exposure to carried interest, deal bonuses, and equity compensation", "Managing Partner role indicates C-suite compensation and profit participation in firm revenues"], "why_now_reasons": ["Managing Partner position of major law firm office - significant leadership equity and profit sharing", "Represents mega-deal clients (MLB franchise acquisitions, 2026 FIFA World Cup bidding, NWSL creation) indicating high carried interest", "21+ years at top tier firm suggests significant accumulated wealth; likely approaching peak earning years and considering long-term preservation", "Active board member at multiple institutions (Hudson River Park Trust, Citizens Budget Commission, City in the Community) suggests wealth and civic interest aligned with HNW individuals"], "concerns": [], "recommended_outreach_angle": "Congratulate on Managing Partner elevation; position Finvisor as partner for managing concentrated sports/entertainment industry relationships, deal proceeds diversification, and tax-optimized wealth preservation for high-net-worth clients in his ecosystem."}, {"name": "Matthew Harris", "current_role": "Founding Partner at Global Infrastructure Partners", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/matthew-harris-46906122a", "icp_match_score": 95, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Founding Partner and executive at Global Infrastructure Partners, one of the world's leading infrastructure private equity firms with $100B+ AUM. Based in NYC, with 20+ years leading strategic investments and partnerships globally. Also minority owner of Cleveland Guardians and founder of impact organization The Bedari Collective.", "match_reasons": ["Founding Partner at $100B+ AUM infrastructure PE firm - estimated income $5M-50M+ annually", "NYC-based, confirmed in profile", "Member of Executive Committee, Investment Committees, and Portfolio Valuation Committee - senior decision-maker role", "20 years at firm (founded 2006, profile implies early involvement) with expanding responsibilities suggests peak earning years", "Finance/PE industry with exposure to carried interest, fund distributions, and significant wealth concentration"], "why_now_reasons": ["Founding Partner status indicates established wealth and sophisticated financial needs", "Multiple concurrent leadership roles (GIP, EnLink Chairman, Bedari Collective founder, Board positions) suggest complex tax and estate planning requirements", "Ownership positions across multiple entities (PE fund, public company board, sports team, nonprofits) creates concentrated wealth and diversification needs", "15+ years of compounded fund distributions likely at substantial levels, requiring optimization"], "concerns": ["Profile shows minimal recent activity (last noted activity from 5-6 months ago), may be less engaged on LinkedIn", "No explicit mention of near-term life transitions or wealth events that would create immediate urgency", "Profile reads more as legacy/bio than active engagement, suggesting may be less responsive to outreach"], "recommended_outreach_angle": "Position Finvisor as specialized wealth advisors for PE partners managing diversified holdings across multiple entities; emphasize expertise in fund distribution optimization, concentrated position diversification, and multi-entity tax planning for ultra-high-net-worth individuals."}, {"name": "Matthew Salerno", "current_role": "Partner at Cleary Gottlieb Steen & Hamilton LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/matthew-salerno-54017280", "icp_match_score": 95, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Corporate Partner at Cleary Gottlieb with 24+ years of legal experience and 16 years as Partner. Specializes in M&A and private equity transactions. NYC-based and at one of the nation's most prestigious law firms.", "match_reasons": ["Partner at Cleary Gottlieb, an AmLaw top-10 firm - estimated income $2-5M+ annually", "NYC-based with clear New York location confirmation", "24+ years of experience indicates peak earning years and substantial accumulated wealth", "M&A/PE practice focus means exposure to carried interest, deal bonuses, and complex tax situations", "Firm size (1000+ employees) and prestige (founded 1946) indicates top-tier compensation"], "why_now_reasons": ["16 years as Partner (since Jan 2010) suggests substantial equity stake and profit participation", "Long tenure at firm indicates stability and likely significant book of business generating ongoing distributions", "M&A practice is currently active - recent deal activity likely generating substantial income volatility requiring wealth management"], "concerns": [], "recommended_outreach_angle": "Recognize his 16-year partnership track record and expertise in complex transactions; offer insights on wealth concentration management strategies for partners with significant firm equity and deal-related income."}, {"name": "Michael Lazerow", "current_role": "Cofounder, Managing Partner at Velvet Sea Ventures", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/lazerow", "icp_match_score": 95, "urgency_score": 78, "matched_icp": "business_owners_exits", "summary": "Serial entrepreneur and venture capitalist who has successfully exited multiple companies worth billions, including Buddy Media ($745M to Salesforce) and GOLF.com (acquired by Time Warner). Currently operates a diverse portfolio as Managing Partner of Velvet Sea Ventures and owner of Merraine Group. NYC-based with 27+ years experience and documented exits from major liquidity events.", "match_reasons": ["Serial founder with multiple successful exits: Buddy Media ($745M to Salesforce), GOLF.com (to Time Warner), and Student Advantage (from U-Wire sale) - all demonstrate exit experience and business acumen", "Current business ownership: Managing Partner at Velvet Sea Ventures (venture capital) and Owner of Merraine Group ($51-200 employees, recruiting firm) - demonstrates active business portfolio management", "NYC-based confirmed with multiple NY-based ventures and clear NYC address listed", "High net worth signaled by $10B+ in returns from 100+ portfolio company investments and personal investments in IPOs/acquisitions (Braze IPO, Scopely $5B acquisition)", "27+ years of entrepreneurial experience puts him in ideal age range for wealth accumulation and transition planning", "Co-founder of major exits indicates likely concentrated wealth positions requiring diversification strategy"], "why_now_reasons": ["Recently acquired Merraine Group in June 2024 - new business ownership creates tax complexity and wealth management needs", "Portfolio of exits and investments likely generating significant income from various sources (carried interest, board positions, angel returns) requiring tax optimization", "Established thought leader (NYT bestselling author, Ernst & Young Entrepreneur of Year) suggests peak earning years and likely considers legacy planning", "Multiple board and advisor positions suggest strategic portfolio rebalancing and potential liquidity event planning"], "concerns": ["Ultra-high net worth individual may already have sophisticated wealth management in place with existing advisors", "Portfolio is highly diversified across ventures, may not have significant concentrated stock positions requiring exit planning", "Venture capital focus suggests existing exposure to financial sophistication and likely existing relationships with wealth managers"], "recommended_outreach_angle": "Position Finvisor as specialized partner for multi-exit consolidation, tax-optimized structuring of diverse portfolio holdings, and strategic wealth preservation for serial entrepreneurs with $1B+ in lifetime exits."}, {"name": "Sharon Greenberg", "current_role": "Managing Director at BlackRock", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/sharon-greenberg-mpa-1919b6348", "icp_match_score": 95, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Managing Director and Head of Private Debt Solutions at BlackRock with 33+ years of financial services experience. Currently leads a $2B+ diversified private debt business within BlackRock's $90B global private debt platform. NYC-based with extensive C-suite responsibilities including portfolio management, client relationships, and committee leadership.", "match_reasons": ["Managing Director at BlackRock - C-suite role with estimated income $500K-$2M+", "NYC-based, confirmed in profile location", "33+ years of experience demonstrates peak earning and wealth accumulation phase", "Head of $2B+ business with senior portfolio management responsibilities indicates substantial compensation and equity upside", "Finance industry expert with carried interest exposure through private debt/private credit management"], "why_now_reasons": ["Promoted to Head of Private Debt Solutions in 2021 - elevated platform leadership role managing $90B business", "33+ years at firms suggests significant accumulated wealth and ongoing equity positions", "Managing multi-strategy debt solutions with complex tax implications (K-1s, carried interest, deferred comp)", "Senior committee memberships (voting member of investment committees, chair of oversight) indicate increasing complexity in personal tax/estate planning"], "concerns": [], "recommended_outreach_angle": "Acknowledge her leadership in private debt solutions; offer expertise on tax optimization for carried interest structures, concentrated equity positions, and succession/retirement planning for senior executives managing substantial investment portfolios."}, {"name": "Tracy Bacigalupo", "current_role": "NYC Managing Partner, Co-Head M&A/Business Transactions at Womble Bond Dickinson (US) LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/tracybacigalupo", "icp_match_score": 95, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "M&A partner and NYC Managing Partner at Womble Bond Dickinson with 31 years of legal experience. Recognized as a top M&A lawyer nationally, specializing in corporate transactions, private equity, and venture capital deals. Currently leading the M&A practice at major law firm.", "match_reasons": ["NYC Managing Partner and Co-Head of M&A/Business Transactions at major law firm - estimated income $2-5M+", "31 years of experience with partner status at multiple AmLaw 200 firms (DLA Piper, Foley & Lardner, Morrison & Foerster, McDermott Will & Emery)", "Named to Global M&A Network's 'Top 50: Americas - M&A Lawyers' in February 2023, one of only three women on the list", "NYC-based, confirmed in profile and leading NYC office operations", "Deep exposure to private equity and venture capital transactions indicating carried interest and significant deal-related compensation"], "why_now_reasons": ["Promoted to Managing Partner at Womble Bond Dickinson in April 2023 - added P&L responsibility and equity partnership stake", "31 years in practice at peak earning capacity; likely peak wealth accumulation and complexity phase", "Leadership role means new tax complexity (K-1 income, partnership distributions, self-employment considerations)", "Firm moved to new platform (Apr 2023), suggesting organizational restructuring and potential compensation adjustments"], "concerns": ["No explicit timeline for retirement mentioned, so urgency may be lower than immediate-trigger prospects", "Current role at Womble Bond Dickinson (founded 2017) is smaller than her previous AmLaw 200 firms; unclear if income trajectory continues upward"], "recommended_outreach_angle": "Congratulate on Managing Partner role; offer strategic insight on tax optimization for multi-firm partner compensation structures and wealth diversification strategies for concentrated partnership interests."}, {"name": "Amy Wollensack", "current_role": "Private Equity Partner at Akin Gump Strauss Hauer & Feld LLP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/amy-wollensack", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Private Equity Partner at Akin Gump with 18+ years of experience in complex M&A and PE transactions. Currently Partner since June 2022, NYC-based, with deep expertise in leveraged buyouts, recapitalizations, and corporate restructuring.", "match_reasons": ["Partner at top-tier AmLaw firm (Akin Gump) specializing in Private Equity - estimated income $1.5M-4M+", "NYC-based, confirmed location in New York, New York", "18+ years of experience in high-income finance sector, well within prime wealth accumulation phase", "Progression through Kirkland & Ellis (AmLaw top 10) as Associate and PE Partner, then Covington as Co-Chair, now Partner at Akin Gump demonstrates consistent senior positioning", "Specialized expertise in PE transactions, leveraged buyouts, and deal structuring indicates carried interest exposure and significant performance-based compensation"], "why_now_reasons": ["Partner since June 2022 (3+ years current role) - past initial partnership ramp but now at peak earning phase with established book of business", "Recent activity (Dec 2025 publication) shows active engagement in Women in PE and industry events, signaling career stability and wealth accumulation focus", "18+ years at top firms suggests loyalty and long-term wealth building trajectory; likely approaching wealth optimization and tax planning needs"], "concerns": ["Partnership achieved in 2022 (3+ years ago), not recent promotion - slightly less immediate urgency than fresh partner elevation", "Profile lacks explicit indicators of recent exits, acquisitions, or major liquidity events that would create immediate planning needs"], "recommended_outreach_angle": "Approach as peer wealth strategist; offer insight on carried interest tax optimization, PE partner wealth preservation strategies, and succession planning for established partners managing substantial deal flow."}, {"name": "Andrew Hulsh", "current_role": "Partner at Mintz", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/andrewhulsh", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "M&A Partner at Mintz with 40+ years of legal career spanning multiple Am Law firms. Specializes in private equity-backed and cross-border M&A transactions. Promoted to Partner at Mintz in April 2023 after 7+ years as Partner at Troutman Pepper.", "match_reasons": ["Partner at Mintz (600+ lawyer firm) - estimated income $1-3M+ annually", "NYC-based, confirmed in profile (New York, New York)", "40+ years experience (graduated 1982, currently age ~64) = peak wealth accumulation and pre-retirement phase", "Specializes in private equity, M&A, and capital markets - exposure to carried interest, deal bonuses, and performance incentives", "Board experience at publicly-listed company demonstrates senior advisor status and additional income streams", "Media contributor and published author (CNBC, WSJ, Bloomberg) - thought leader in wealth-generating practice areas"], "why_now_reasons": ["Promoted to Partner at Mintz April 2023 (2.7 years ago) - recent partner transition with new equity stake", "Age ~64 with 40+ years career suggests approaching retirement planning window (next 5-10 years)", "25+ years as transactional attorney in high-income specialty (PE/M&A) at peak earning years", "Extensive board experience and senior advisor roles indicate accumulated wealth and complex financial structures needing optimization"], "concerns": ["Latest partner move was April 2023 (nearly 3 years ago) - not a hyperactive job-switcher but stable at Mintz", "Profile lacks explicit mention of current compensation, equity details, or recent promotions (no very recent trigger)", "No explicit 'open to work' or stated transition signals in profile"], "recommended_outreach_angle": "Acknowledge 40-year career trajectory and recent partner transition at Mintz; offer strategic consultation on wealth consolidation, tax optimization for partner compensation (K-1, carried interest), and legacy/succession planning as he enters pre-retirement phase."}, {"name": "Bjorn Bjerke", "current_role": "Partner at A&O Shearman", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/bjorn-bjerke-b0b45933", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Senior M&A Partner at A&O Shearman with 27+ years of legal experience and Columbia Law pedigree (First in Class). Partner at three AmLaw firms (Davis Polk, Shearman & Sterling, now A&O Shearman). Active in cross-border M&A and life sciences transactions.", "match_reasons": ["Partner at AmLaw #1 firm (A&O Shearman) - estimated income $2M-5M+ annually from partner distributions and originations", "NYC-based, confirmed in profile with strong NYC law firm network", "27+ years of experience, age approximately 56-60 (Columbia Law grad 1998), prime wealth accumulation and transition phase", "Senior partner status with C-Suite level designation at major law firm suggests significant financial complexity (K-1 income, carried interest, deferred compensation)"], "why_now_reasons": ["Recent major transition: merged firm (Shearman & Sterling -> A&O Shearman) May 2024, likely involved equity recapitalization and tax planning needs", "27+ years at senior partner level indicates approaching wealth preservation/transition planning phase", "Active in M&A and life sciences sectors with significant originations; accumulated carried interest and deal-related compensation"], "concerns": ["Published date shows December 2025, suggesting profile data may be recent but promotion timing is from May 2024 (not within last 6 months of current date)", "No explicit mention of new promotion to partner in 2025/2026 despite query source mentioning '2026' - already partner for 11+ years at previous firm, so less acute urgency signal than a new partnership elevation"], "recommended_outreach_angle": "Acknowledge the A&O Shearman merger transition and its tax/restructuring complexity; position wealth management services around consolidating cross-border client relationships and optimizing partner compensation structures post-merger."}, {"name": "Bobby Sharma", "current_role": "Founder & Managing Partner, Bluestone Equity Partners", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/bobbysharma", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "business_owners_exits", "summary": "PE founder and Managing Partner of Bluestone Equity Partners (founded 2022), focused on sports, media & entertainment. 28+ years of experience spanning law, sports governance, and investment. NYC-based with significant wealth accumulation and entrepreneurial track record.", "match_reasons": ["Founder & Managing Partner of PE firm - clear business ownership signal with founding role", "NYC-based, confirmed in profile (New York, New York)", "28+ years total experience indicates age 50-55, ideal for ICP1 wealth accumulation and succession planning", "Established track record: previously founded/co-founded multiple ventures (Electronic Sports Group, NextGen Venture Partners, Blue Devil Holdings)", "High-growth potential for Bluestone Equity Partners - institutionally-backed PE firm suggests significant capital under management and equity stake"], "why_now_reasons": ["Founded Bluestone Equity Partners in January 2023 - approximately 2 years into growth phase, likely substantial capital commitments and complex financial structures", "Shifted from Executive Chairman at Blue Devil Holdings (8 years) to Founder of new PE vehicle - major transition suggests liquidity event and new wealth concentration", "Sports, Media & Entertainment focus areas experience significant M&A activity and capital flows - active deal flow increases tax complexity and wealth management needs", "Multiple board positions and advisory roles (USTA, Goodwill, etc.) suggest high net worth individual with philanthropic interests requiring wealth optimization"], "concerns": ["Bluestone Equity Partners is early-stage (founded 2022) with only 1-10 employees - may still be in capital raise phase, limiting immediate liquidity for personal wealth management", "PE firm founder will likely be focused on deploying capital and managing portfolio companies rather than personal wealth - may not prioritize external advisor services short-term"], "recommended_outreach_angle": "Approach as a peer in wealth management circles; offer specialized expertise in structuring compensation and equity diversification strategies for PE founders managing complex capital structures and portfolio interests."}, {"name": "David Spiller", "current_role": "Partner at Bain Capital", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/david-spiller-74b4205", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Partner at Bain Capital with 19 years of experience, including 14 years as Partner and prior 5+ years as Associate Partner at McKinsey. NYC-based with board positions at high-growth manufacturing companies. Elite educational background (Columbia Law, Columbia MBA, Georgetown undergrad).", "match_reasons": ["Partner at Bain Capital - top-tier PE firm with estimated annual income $2-5M+", "NYC-based, confirmed in profile", "19 years total experience puts him in peak earning/wealth accumulation phase (approximately 45-50 years old based on timeline)", "Prior Associate Partner at McKinsey demonstrates elite consulting pedigree and likely carried interest/carried equity", "Current board positions at mid-market portfolio companies (Dessert Holdings 1001-5000 employees, Apex Tool Group 5001-10000 employees) indicate significant wealth and networks", "Columbia Law and MBA (2004-2006 graduation window) confirms elite credentials"], "why_now_reasons": ["14 years as Partner at Bain Capital suggests established success and concentrated equity position that may need diversification", "Recent board appointments (Dessert Holdings Jan 2025) indicate active portfolio engagement and multiple wealth streams", "19 years into career suggests entering peak pre-retirement wealth planning phase (age ~45-50)", "Board member roles on mid-market manufacturing companies indicate exposure to illiquid portfolio company equity needing sophisticated management"], "concerns": [], "recommended_outreach_angle": "Approach with focus on sophisticated portfolio management and liquidity strategy for board equity across multiple portfolio companies, tax optimization for carried interest/partnership distributions, and concentrated Bain Capital equity position diversification."}, {"name": "Jonathan Bram", "current_role": "Partner at Global Infrastructure Partners", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/jonathan-bram-3a3a7311", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Partner at Global Infrastructure Partners with 33+ years of experience, including 19+ years at GIP and 14 years at Credit Suisse. NYC-based infrastructure investor with significant AUM exposure and likely substantial carried interest and management fees.", "match_reasons": ["Partner at Global Infrastructure Partners - estimated income $1-5M+ annually from base + carried interest", "NYC-based, confirmed in profile", "33+ years experience with 19+ years as Partner indicates peak earning potential", "C-Suite Partner level at major investment firm managing significant AUM", "Exposure to multiple infrastructure deals through active engagement with energy/renewable projects"], "why_now_reasons": ["Active Partner role at major growth-stage fund with strong recent AUM growth (Blue Owl 26% YoY growth)", "33+ year career suggests approaching wealth transition and legacy planning phase", "Infrastructure sector experiencing significant M&A and capital deployment activity", "Recent engagement with major deals (NextEra Energy, Clearway Energy) indicates ongoing deal flow and carried interest realization"], "concerns": ["Profile lacks explicit education graduation date (Columbia 1983-1987 inferred), making precise age estimation difficult", "No explicit mention of recent promotions or transitions within last 6 months to GIP Partner role", "Limited personal information about net worth or specific wealth indicators"], "recommended_outreach_angle": "Acknowledge his partnership at GIP and infrastructure sector expertise; offer guidance on diversification strategies and tax-efficient wealth structures for partner carry and management fee income streams."}, {"name": "Jonathan Cohen", "current_role": "Chairman and CEO at HEPCO Capital Management LLC", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/jonathan-cohen-63a0a6197", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "business_owners_exits", "summary": "Serial entrepreneur and investor with 25+ years of experience. Founder and CEO of HEPCO Capital Management, a family office/investment firm. Multiple successful exits and current portfolio company involvement across energy, healthcare, and tech sectors.", "match_reasons": ["Founder/CEO of HEPCO Capital Management - operates as business owner at the highest level", "NYC-based, confirmed in profile header", "25+ years of business experience indicates substantial wealth accumulation", "Multiple founder and C-suite roles demonstrate entrepreneur pedigree and likely multi-million dollar net worth", "Portfolio company involvement (board director at Marathon Petroleum, founder roles at Falcon Minerals, Osprey Energy) suggests concentrated positions and ongoing liquidity events", "Energy/infrastructure focus aligns with high-value exits and deal-making experience"], "why_now_reasons": ["Founder of HEPCO Opportunity Partners (Nov 2022) - new fund suggests active deal flow and liquidity events", "Active board director at Marathon Petroleum (public company, Dec 2019-present) - equity position needing diversification strategy", "Extensive portfolio company involvement visible in recent LinkedIn activity showing M&A, IPO, and fundraising activity in portfolio", "Late career stage (25+ years experience) with multiple exits suggests wealth concentration and estate planning needs"], "concerns": ["No specific recent promotion or acquisition announcement in last 6 months visible in profile data", "Profile lacks detailed financial metrics (revenue, AUM, business size) for HEPCO Capital Management", "Age inference limited - University of Pennsylvania degree starting 1992 suggests approximately 50-54 years old, within range but not confirmed"], "recommended_outreach_angle": "Approach as peer financial advisor offering portfolio diversification and wealth concentration strategy for family office with multiple illiquid positions across energy and infrastructure sectors; reference recent portfolio company exits and IPOs as context for updated wealth strategy."}, {"name": "Michelle Ross", "current_role": "CIO Managing Partner at StemPoint Capital LP", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/michelle-ross-76a7795", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "CIO Managing Partner at StemPoint Capital with 19+ years of experience in investment management. Previously Portfolio Manager Partner at Sphera Fund and VP at PointState Capital. NYC-based with strong track record in infrastructure and healthcare fund management.", "match_reasons": ["CIO Managing Partner at StemPoint Capital - Partner-level role indicates estimated income $1M-$5M+", "NYC-based, confirmed in profile (New York, New York)", "19 years 9 months total experience puts her at prime wealth accumulation phase (likely age 45-50)", "Multiple partner positions demonstrate senior leadership and carried interest exposure", "Advanced degree (MA Biotechnology from Columbia) with financial industry expertise", "Current role at 1-10 employee partnership indicates significant equity stake"], "why_now_reasons": ["Current CIO Managing Partner role (Oct 2022-Present, 3+ years) with small partnership structure suggests significant carried interest growth", "Infrastructure fund focus aligns with 2026 trend in private markets and potential liquidity events", "History of launching/joining new funds (Sphera in 2016, StemPoint in 2022) indicates active deal flow and wealth generation", "19+ years of experience suggests approaching peak earning years with complex compensation structures"], "concerns": ["Profile lacks explicit details on personal net worth or specific compensation figures", "Limited visibility into current assets under management (AUM) at StemPoint Capital", "No public statements about retirement planning or wealth transition signals", "Small firm size (1-10 employees) may indicate less established fund vs. larger platforms"], "recommended_outreach_angle": "Recognize her accomplished track record launching and leading investment partnerships; offer specialized wealth planning and diversification strategies for managing personal carried interest and concentrated fund positions in infrastructure investing."}, {"name": "Richard Myers", "current_role": "Managing Director at Morgan Stanley", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/richard-myers-b3728418", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Managing Director at Morgan Stanley with 21+ years in capital markets and investment banking. Currently Global Head of Private Capital Markets and Securitized Products. Based in NYC with progressive leadership experience at tier-one financial institutions.", "match_reasons": ["Managing Director at Morgan Stanley - C-suite level role with estimated annual income $1M+", "NYC-based, confirmed in profile (New York, New York)", "21+ years of experience in high-level finance roles across Credit Suisse and Morgan Stanley", "Specialized in private capital markets, securitization, and financial institution financing - exposure to substantial bonus and carry compensation", "Leadership of global business units suggests elevated compensation and equity participation"], "why_now_reasons": ["Promoted to Managing Director at Morgan Stanley in July 2022 (currently 3.5 years in role) with expanded responsibilities as Global Head", "21+ years at senior banking level suggests peak earning years and increasing wealth accumulation pressure", "Likely managing significant personal equity positions and bonus accumulation requiring tax and wealth strategy", "Global Head roles typically involve significant deferred compensation and long-term incentive planning"], "concerns": ["Profile lacks specific information on personal net worth or outside assets", "No explicit signals of recent promotion or imminent transition; MD title since 2022 is established", "Limited personal activity/thought leadership on profile suggests lower engagement in external networks"], "recommended_outreach_angle": "Approach with focus on private wealth strategies for senior finance executives managing concentrated equity positions and complex compensation structures; position Finvisor as specialized partner for Morgan Stanley MD-level wealth coordination."}, {"name": "Roger G Arrieux", "current_role": "East Region Market Leader & New York Managing Partner, Partner at Deloitte", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/roger-g-arrieux-jr", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "high_income_professional", "summary": "Senior Partner at Deloitte with 32+ years of experience, serving as East Region Market Leader and New York Managing Partner. Based in NYC, he oversees 700+ partners and 8,000+ professionals across Deloitte's largest office, with extensive expertise in financial services, risk management, and corporate governance.", "match_reasons": ["Partner at Big Four firm (Deloitte) - estimated income $1-3M+ annually with bonus and profit distributions", "NYC-based, confirmed as New York Managing Partner", "32+ years at Deloitte puts him at 55-60 years old, prime wealth management demographic", "Senior leadership role (Managing Partner, Board Council Member) with responsibility for largest regional office", "Deep expertise in financial services, corporate governance, and investment management - likely significant carried interest and compensation complexity"], "why_now_reasons": ["Currently elevated to regional market leader role, managing growth across 48 offices - new strategic wealth planning needs", "Serves on Deloitte USA Board and Finance/Audit Committee - complex compensation structure and tax exposure", "Age 55-60 range signals approaching wealth transition phase with multi-decade career at peak earning", "Leadership role managing alternative investment management client relationships suggests exposure to deal flow and concentrated positions"], "concerns": ["Profile does not explicitly state promotion date to current Managing Partner role (started Aug 2020) - less recent trigger than ideal", "No mention of 'open to work' or transition signals - appears stable in current role", "As an employee of large partnership, wealth may be less concentrated than business owner or independent consultant"], "recommended_outreach_angle": "Congratulate on market leadership role; offer strategic consultation on optimizing partner compensation structures, estate planning for accumulated partnership equity, and wealth diversification strategies for high-net-worth executives managing complex K-1 and deferred comp arrangements."}, {"name": "Stephanie Geveda", "current_role": "Founder & Managing Partner at Coalesce Capital", "location": "Rye, New York", "linkedin_url": "https://linkedin.com/in/stephanie-geveda", "icp_match_score": 94, "urgency_score": 78, "matched_icp": "business_owners_exits", "summary": "Founder and Managing Partner of Coalesce Capital, a private equity firm focused on human capital and technology-enabled services companies. Previously spent 12+ years as Partner and Head of Business Services Group at Warburg Pincus. 24+ years of investment and operating experience with deep expertise in building and scaling services companies.", "match_reasons": ["Founder & Managing Partner of PE firm - aligns perfectly with business owner/exit ICP", "NYC-based (Rye, NY is Westchester commuting distance to NYC)", "12 years as Partner at Warburg Pincus managing significant AUM and portfolio companies", "Founded Coalesce Capital in Jan 2023 - demonstrates entrepreneurial exit planning mindset", "Extensive board experience across 12+ portfolio companies including public exits (Sotera Health) and acquisitions", "Harvard MBA and University of Notre Dame graduate - high net worth indicators", "Top awards for female dealmaker and growth investing leadership", "Age inferred ~45-50 based on 24+ years experience and MBA graduation 2007 - ideal age for wealth accumulation and succession planning"], "why_now_reasons": ["Launched own PE firm in January 2023 - recent major business transition and liquidity event", "Managing her own capital now versus employee at Warburg Pincus - significant change in wealth structure and tax situation", "Currently building Coalesce Capital (11-50 employees) - scaling phase requires strategic financial planning", "Multiple portfolio companies approaching exits/growth milestones - creates near-term liquidity events and concentrated positions", "Recently transitioned from Partner at large PE firm to Founder/MD of own firm - creates immediate need for wealth optimization and tax planning"], "concerns": ["As a PE investor herself, she likely already has sophisticated financial advisors in place", "May view wealth management firms as less sophisticated than her own investment expertise", "Primary focus is PE investing and board work rather than personal wealth accumulation"], "recommended_outreach_angle": "Position Finvisor as a specialized partner for PE founder wealth diversification and succession planning, leveraging her portfolio company exits to build diversified net worth beyond concentrated PE positions."}, {"name": "Alex Cousins", "current_role": "Partner at Arnold & Porter", "location": "New York City Metropolitan Area", "linkedin_url": "https://linkedin.com/in/alex-cousins-4308632a", "icp_match_score": 88, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Corporate law partner at Arnold & Porter promoted to partnership in January 2025. Based in NYC with 11+ years of legal experience, primarily in administrative law at a major AmLaw firm. Recently elevated to partner status with significant income and equity implications.", "match_reasons": ["Partner at AmLaw 50 firm (Arnold & Porter) - estimated income $500K-$2M+", "NYC-based, confirmed in New York City Metropolitan Area", "11+ years of legal experience at major firm suggests partnership income trajectory", "Partner-track career with significant new equity stake and K-1 income complexity"], "why_now_reasons": ["Promoted to Partner in January 2025 - recent and significant income elevation", "First month as partner means new tax complexity from partnership distributions and equity", "Likely at peak earning years with partner-level compensation and benefit planning needs"], "concerns": ["Relatively junior for partnership (11.5 years total experience, suggesting early-to-mid 30s in age)", "Administrative law practice may have different compensation/bonus structure than M&A or litigation", "Limited public profile activity makes full income assessment difficult"], "recommended_outreach_angle": "Congratulate on recent partnership at Arnold & Porter; position as expert in partnership tax structuring and wealth optimization strategies for early-stage partners navigating new equity compensation."}, {"name": "Alison Corsi", "current_role": "Associate Partner at McKinsey & Company", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/alison-corsi-996a9254", "icp_match_score": 88, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Associate Partner at McKinsey & Company with 10+ years of experience, recently promoted from Engagement Manager in July 2025. NYC-based consultant with strong financial services and consulting background. Estimated income in $300K-$500K+ range with partnership equity benefits.", "match_reasons": ["Promoted to Associate Partner July 2025 (6 months ago) - significant income jump and equity compensation", "NYC-based, confirmed in profile", "10+ years of progressive experience in consulting and finance indicates appropriate seniority and earning power", "McKinsey partnership provides substantial income, bonus structure, and equity participation typical of high-income professionals"], "why_now_reasons": ["Recently promoted to Associate Partner (July 2025) - new partnership equity stake and income structure requiring wealth planning", "First-year partner at McKinsey means new complexity around bonus structure, carried interest-like distributions, and tax planning", "Age estimated at 32-34 (graduated 2015) puts her in prime wealth accumulation phase with 15-20+ year career runway"], "concerns": ["Consulting background rather than traditional ICP industries (Law, Finance, Healthcare executives) - though McKinsey's wealth profile aligns", "As newer partner (6 months in), may still be ramping up to full earning potential"], "recommended_outreach_angle": "Congratulate on Associate Partner promotion; highlight tax optimization strategies for McKinsey partners managing bonus structures and equity distributions, plus guidance on diversifying consultant wealth into longer-term investments."}, {"name": "Andrew Lichtman", "current_role": "Litigation Partner at Willkie Farr & Gallagher", "location": "New York, New York", "linkedin_url": "https://linkedin.com/in/andrew-lichtman-38489534", "icp_match_score": 88, "urgency_score": 85, "matched_icp": "high_income_professional", "summary": "Litigation Partner at Willkie Farr & Gallagher with 14+ years of legal experience. Recently transitioned from 6+ years as Partner at Jenner & Block to Willkie in February 2025. NYC-based with elite educational background and extensive M&A/litigation exposure.", "match_reasons": ["Partner at AmLaw top-10 firm - estimated income $1M-3M+ annually", "NYC-based, confirmed in profile (New York, New York)", "14+ years total legal experience across Cravath, Jenner & Block, and Willkie - all premier litigation practices", "Elite background (NYU Law magna cum laude, Cornell economics) and federal clerkships indicate high-caliber professional"], "why_now_reasons": ["Promoted to Partner at Willkie February 2025 - recent lateral move suggests equity stake reset and new wealth structuring needs", "Mid-career transition (age ~38-40 based on 2007 law school graduation) entering peak earning years with established partner status", "Recent partner elevation combined with firm change creates immediate tax planning and retirement optimization needs (K-1, self-employment tax, qualified retirement plans)"], "concerns": [], "recommended_outreach_angle": "Congratulate on partnership at Willkie; offer specialized guidance on tax optimization and wealth structuring for law firm partners navigating lateral moves and new partnership equity stakes."}];

// --- ICP LABELS ---
const ICP_MAP = {
 high_income_professional: "High-Income Professional",
 business_owners_succession: "Business Owner | Succession",
 business_owners_exits: "Business Owner | Exit",
 business_owner: "Business Owner",
 business_owners: "Business Owner",
 tech_transitions: "Tech Transition",
 pre_retiree_wealth_transitioner: "Pre-Retiree",
 pre_retirees_wealth_transitioners: "Pre-Retiree",
 business_owner_and_high_income_professional: "Owner + HIP",
 high_income_professional_and_business_owner: "HIP + Owner",
 high_income_professional_future: "HIP (Future)",
 high_earners_finance: "High Earner | Finance",
 emerging_prospect: "Emerging Prospect",
 tech_executive_outlier: "Tech Executive",
};

const ADVISOR_FIRM = "Finvisor";

const EMAIL_PROMPT = `You are an expert financial advisor copywriter for ${ADVISOR_FIRM}. Generate a personalized prospecting email following these STRICT rules:

STRUCTURE (The Advisor's 3-Sentence Framework):
1. THE HOOK: Reference their specific firm, role, or industry to show you've done research. Be specific - name their company and recent event.
2. THE VALUE: Pitch a creative, tax-advantaged strategy or optimized approach to tax efficiency unique to their situation. Use vocabulary: "innovative", "ancillary opportunities", "tax efficiency", "optimize".
3. THE GUARDRAIL: Explicitly state you are looking to COMPLEMENT - not replace - their existing advisory team by handling ancillary needs.

COMPLIANCE RULES (FINRA/SEC - MANDATORY):
- NEVER promise specific returns or performance outcomes
- NEVER use guarantees ("guaranteed", "risk-free", "certain returns")
- NEVER cherry-pick or reference specific past performance data
- NEVER make misleading claims about services or capabilities
- ALWAYS end with: "Securities offered through Finvisor. Member FINRA/SIPC. This communication is for informational purposes only and does not constitute investment advice."
- Keep tone professional but warm
- Do NOT suggest replacing their current advisor
- Do NOT use generic "wealth management" language
- NEVER fabricate credentials, awards, or statistics

FORMAT: Return ONLY the email.
Line 1: Subject: [subject line]
Line 2: (blank)
Lines 3+: Email body with greeting, 3-sentence structure, a clear CTA asking for a brief call, signature as "[Advisor Name]\\nSenior Wealth Strategist\\nFinvisor", then the mandatory FINRA/SIPC disclosure.
Keep body under 150 words.`;

const COMPLIANCE_PROMPT = `You are a FINRA/SEC compliance officer AI. Review financial advisor outreach emails for regulatory compliance.

CHECK THESE RULES:
1. NO PROMISES OF RETURNS: Flag language promising, implying, or suggesting specific returns, guaranteed outcomes, or risk-free results. Watch for: "guaranteed", "ensure returns", "risk-free", "certain gains", "will grow", "promise", "secure your future", "protect against loss".
2. NO MISLEADING CLAIMS: Flag exaggerated or deceptive claims. Watch for: "best in class", "unmatched", "only firm that", "#1", "exclusive access" (unless true), fabricated statistics.
3. REQUIRED DISCLOSURES: Must contain FINRA/SIPC membership disclosure AND informational-purposes statement. Flag if either missing.
4. NO CHERRY-PICKED PERFORMANCE: Flag specific past performance or selective data. Watch for: percentages, "our clients achieved", "track record of X%".
5. NO REPLACEMENT LANGUAGE: Must complement, not replace, existing advisor. Watch for: "switch to us", "better than your current", "replace".
6. PROFESSIONAL TONE: Flag aggressive or high-pressure language. Watch for: artificial deadlines, fear-based messaging, excessive exclamation marks.
7. TRUTHFULNESS: Flag unverifiable claims. Watch for: made-up awards, unverifiable statistics, false credentials.

RESPOND IN THIS EXACT JSON FORMAT ONLY (no markdown, no backticks, no preamble):
{
 "passed": true or false,
 "confidence": 0-100,
 "summary": "One sentence assessment",
 "flags": [
 {
 "phrase": "exact flagged text",
 "rule": "1-7",
 "severity": "high" or "medium" or "low",
 "explanation": "why non-compliant",
 "suggestion": "compliant rewrite"
 }
 ],
 "compliant_elements": ["list of compliant items"]
}`;

// --- UTILS ---
function score(p) { return Math.round((p.icp_match_score||0) * 0.55 + (p.urgency_score||0) * 0.45); }
function tier(s) {
 if (s >= 85) return { label: "Priority", color: "#9B2C2C", bg: "#FFF5F5" };
 if (s >= 70) return { label: "High", color: "#C9A84C", bg: "#FFFBEB" };
 if (s >= 50) return { label: "Medium", color: "#2D6A4F", bg: "#F0FFF4" };
 return { label: "Low", color: "#767676", bg: "#F7F7F7" };
}
function icpLabel(v) { return ICP_MAP[v] || (v === "none" || !v ? "Unqualified" : v.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())); }
function isDNC(p) { const a = (p.recommended_outreach_angle||"").toLowerCase(); return a.includes("do not contact") || a.includes("not recommended") || a.includes("do not pursue"); }
function fmtDate(d) { return new Date(d).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true}); }
function getGeminiText(payload) {
 const parts = payload?.candidates?.[0]?.content?.parts;
 if (!Array.isArray(parts)) return "";
 return parts.map(part => part?.text || "").join("").trim();
}
function parseModelJson(text) {
 const cleaned = (text || "").replace(/```json|```/gi, "").trim();
 if (!cleaned) throw new Error("Empty model response");
 const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
 return JSON.parse((jsonMatch?.[0] || cleaned).trim());
}
function normalizeComplianceResult(raw) {
 const flags = Array.isArray(raw?.flags) ? raw.flags.filter(Boolean).map(flag => ({
 phrase: String(flag?.phrase || "").trim(),
 rule: String(flag?.rule || "").trim(),
 severity: ["high","medium","low"].includes(flag?.severity) ? flag.severity : "medium",
 explanation: String(flag?.explanation || "").trim(),
 suggestion: String(flag?.suggestion || "").trim(),
 })) : [];
 const compliantElements = Array.isArray(raw?.compliant_elements) ? raw.compliant_elements.filter(Boolean).map(String) : [];
 const confidenceNum = Number(raw?.confidence);
 const confidence = Number.isFinite(confidenceNum) ? Math.max(0, Math.min(100, Math.round(confidenceNum))) : (flags.length ? 35 : 85);
 const passed = typeof raw?.passed === "boolean" ? raw.passed : flags.length === 0;
 return {
 passed,
 confidence,
 summary: String(raw?.summary || (passed ? "No material compliance issues detected." : "Potential compliance issues were detected.")),
 flags,
 compliant_elements: compliantElements,
 error: raw?.error ? String(raw.error) : null,
 };
}
function localDraftForProspect(p) {
 const whyNow = (p?.why_now_reasons||[])[0] || "your recent leadership momentum";
 const angle = p?.recommended_outreach_angle || "tax efficiency and ancillary planning opportunities";
 const subject = `${p?.name?.split(" ")?.[0] || "Your"} tax strategy discussion`;
 const body = `Dear ${p.name},\n\nI noticed ${whyNow} and thought your work as ${p.current_role} at ${(p.current_role||"").includes(" at ") ? p.current_role.split(" at ")[1] : ADVISOR_FIRM} could make this a timely moment to explore innovative ways to optimize tax efficiency around ${angle.toLowerCase()}. We often help professionals in similar positions evaluate ancillary opportunities that can complement broader planning without disrupting what is already working.\n\nWe would look to complement, not replace, your existing advisory team by supporting specialized planning needs that may sit outside the day-to-day focus of your current relationships.\n\nWould you be open to a brief call next week to see whether a focused conversation would be useful?\n\nBest regards,\n[Advisor Name]\nSenior Wealth Strategist\nFinvisor\n\nSecurities offered through Finvisor. Member FINRA/SIPC. This communication is for informational purposes only and does not constitute investment advice.`;
 return { subject, body };
}
function localComplianceCheck(body, subject="") {
 const email = `Subject: ${subject}\n${body}`.trim();
 const lower = email.toLowerCase();
 const flags = [];
 const addFlag = (phrase, rule, severity, explanation, suggestion) => {
 const exact = phrase || "Detected language";
 flags.push({ phrase: exact, rule, severity, explanation, suggestion });
 };
 const guaranteedTerms = [
 ["guaranteed", "Avoid guarantees or certainty claims.", "We can discuss potential strategies that may support your objectives."],
 ["risk-free", "Avoid describing any strategy as risk-free.", "We can discuss strategies with risks and tradeoffs in context."],
 ["certain return", "Avoid implying certain outcomes.", "We can discuss strategies designed to align with your goals."],
 ["will grow", "Avoid promising performance outcomes.", "May support long-term planning goals depending on your circumstances."],
 ["secure your future", "Avoid promissory or fear-based claims.", "Help you evaluate planning options for future goals."],
 ["protect against loss", "Avoid absolute downside protection claims.", "Help evaluate risk management considerations within your plan."],
 ];
 guaranteedTerms.forEach(([term, explanation, suggestion]) => { if (lower.includes(term)) addFlag(term, "1", "high", explanation, suggestion); });
 const misleadingTerms = [
 ["best in class", "This can be viewed as exaggerated or unverifiable marketing language.", "specialized"],
 ["unmatched", "This can be viewed as exaggerated or unverifiable marketing language.", "differentiated"],
 ["only firm that", "Exclusive superiority claims can be misleading unless substantiated.", "a team that focuses on"],
 ["#1", "Ranking claims require substantiation.", "specialized"],
 ["exclusive access", "Exclusive access claims require substantiation.", "access"],
 ];
 misleadingTerms.forEach(([term, explanation, suggestion]) => { if (lower.includes(term)) addFlag(term, "2", "medium", explanation, suggestion); });
 if (!lower.includes("member finra/sipc")) {
 addFlag("Missing FINRA/SIPC disclosure", "3", "high", "The required FINRA/SIPC membership disclosure is missing.", "Add: Securities offered through Finvisor. Member FINRA/SIPC.");
 }
 if (!lower.includes("for informational purposes only") || !lower.includes("does not constitute investment advice")) {
 addFlag("Missing informational-purpose disclaimer", "3", "high", "The required informational and non-advice disclaimer is missing.", "Add: This communication is for informational purposes only and does not constitute investment advice.");
 }
 if (/\b\d+%/.test(email) || /track record|our clients achieved|outperformed|returned/i.test(email)) {
 addFlag("Potential performance language", "4", "high", "Specific performance references can create a cherry-picking risk.", "Remove specific performance metrics and focus on planning approach instead.");
 }
 const replacementTerms = ["replace your current", "switch to us", "better than your current", "replace your advisor", "move away from your current advisor"];
 replacementTerms.forEach(term => { if (lower.includes(term)) addFlag(term, "5", "high", "Outreach should position Finvisor as complementary, not a replacement.", "State that Finvisor would complement the existing advisory team."); });
 if ((email.match(/!/g) || []).length > 2 || /urgent|act now|limited time|don't miss/i.test(email)) {
 addFlag("High-pressure language", "6", "medium", "The tone may be interpreted as aggressive or overly promotional.", "Use a calmer professional invitation to connect.");
 }
 const truthfulnessTerms = ["forbes 30 under 30", "award-winning", "certified top advisor", "industry-leading statistics"];
 truthfulnessTerms.forEach(term => { if (lower.includes(term)) addFlag(term, "7", "medium", "This appears potentially unverifiable in the email itself.", "Remove or substantiate the claim with clear support."); });
 const passed = flags.length === 0;
 return {
 passed,
 confidence: passed ? 90 : 72,
 summary: passed ? "Built-in compliance review found no material issues." : "Built-in compliance review found issues that should be corrected before sending.",
 flags,
 compliant_elements: [
 lower.includes("member finra/sipc") ? "FINRA/SIPC disclosure included" : null,
 lower.includes("for informational purposes only") ? "Informational-purposes disclaimer included" : null,
 /complement(?!ary)/i.test(email) ? "Complementary positioning used" : null,
 !/\b\d+%/.test(email) ? "No specific performance figures detected" : null,
 ].filter(Boolean),
 error: null,
 };
}
function complianceServiceError(message) {
 return {
 passed: null,
 confidence: 0,
 summary: message || "Compliance service unavailable. Please retry.",
 flags: [],
 compliant_elements: [],
 error: "service_unavailable",
 };
}

const SCORE_TIPS = {
 "ICP Match": "How closely this prospect matches your ideal client profile (0-100). Based on role, AUM signals, and firmographic fit.",
 "Urgency Score": "Signals suggesting the prospect may be actively looking or in transition (0-100). Higher = act sooner.",
 "Composite Rank": "Weighted combination of ICP Match (55%) and Urgency Score (45%) used to rank all prospects."
};

// --- MAIN ---
export default function App() {
 // -- EXISTING STATE --
 const [data, setData] = useState(DEFAULT_DATA);
 const [sel, setSel] = useState(null);
 const [mode, setMode] = useState("autonomous");
 const [body, setBody] = useState("");
 const [subj, setSubj] = useState("");
 const [eBody, setEBody] = useState("");
 const [eSubj, setESubj] = useState("");
 const [comp, setComp] = useState(null);
 const [audit, setAudit] = useState([]);
 const [genning, setGenning] = useState(false);
 const [checking, setChecking] = useState(false);
 const [autoRun, setAutoRun] = useState(false);
 const [sent, setSent] = useState(false);
 const [showAudit, setShowAudit] = useState(false);
 const [search, setSearch] = useState("");
 const [fICP, setFICP] = useState("all");
 const [fTier, setFTier] = useState("all");
 const [showUpload, setShowUpload] = useState(false);
 const [tab, setTab] = useState("detail");

 // -- NEW STATE (Features 1-12) --
 const [toasts, setToasts] = useState([]);
 const [sideCollapsed, setSideCollapsed] = useState(false);
 const [hoveredCard, setHoveredCard] = useState(null);
 const [showKB, setShowKB] = useState(false);
 const [auditFilter, setAuditFilter] = useState("all");
 const [apiKey, setApiKey] = useState("");
 const rightPanelRef = useRef(null);

 // -- STORAGE --
 useEffect(() => { try { (async()=>{ const r=await window.storage.get("fl_audit"); if(r?.value) setAudit(JSON.parse(r.value)); })(); } catch(e){ try { const s=localStorage.getItem("fl_audit"); if(s) setAudit(JSON.parse(s)); } catch(e){} } }, []);
 useEffect(() => { try { window.storage.set("fl_audit",JSON.stringify(audit)); } catch(e){ try { localStorage.setItem("fl_audit",JSON.stringify(audit)); } catch(e){} } }, [audit]);
 useEffect(() => {
 try {
 const stored = window?.localStorage?.getItem("fl_gemini_key") || "";
 if (stored) setApiKey(stored);
 } catch(e) {}
 }, []);
 useEffect(() => {
 try {
 if (apiKey) window?.localStorage?.setItem("fl_gemini_key", apiKey);
 else window?.localStorage?.removeItem("fl_gemini_key");
 } catch(e) {}
 }, [apiKey]);

 // -- FEATURE 3: TOAST SYSTEM --
 const addToast = useCallback((message, type="info") => {
 const id = Date.now() + Math.random();
 setToasts(prev => [...prev, { id, message, type }]);
 setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
 }, []);

 // -- FEATURE 6: AUTO-SCROLL ON TAB --
 useEffect(() => {
 if (rightPanelRef.current) rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
 }, [tab]);

 // -- COMPUTED --
 const prospects = useMemo(() => {
 let list = data.map(p=>({...p, _score: score(p)}));
 list = _.orderBy(list,["_score"],["desc"]);
 return list.filter(p => {
 if(search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.current_role.toLowerCase().includes(search.toLowerCase()) && !(p.location||"").toLowerCase().includes(search.toLowerCase())) return false;
 if(fICP!=="all" && p.matched_icp!==fICP) return false;
 if(fTier!=="all" && tier(p._score).label!==fTier) return false;
 return true;
 });
 },[data,search,fICP,fTier]);

 const icpOpts = useMemo(()=>{
 const c={}; data.forEach(p=>{const k=p.matched_icp||"none"; c[k]=(c[k]||0)+1;});
 return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,6);
 },[data]);

 // -- FEATURE 9: FILTERED AUDIT --
 const filteredAudit = useMemo(() => {
 if (auditFilter === "all") return audit;
 if (auditFilter === "passed") return audit.filter(e => e.passed);
 return audit.filter(e => !e.passed);
 }, [audit, auditFilter]);
 const compStatus = comp === null ? "idle" : comp?.passed === true ? "passed" : comp?.passed === false ? "failed" : "error";

 const handleFile = (e) => {
 const f=e.target.files?.[0]; if(!f) return;
 const r=new FileReader();
 r.onload=(ev)=>{ try{const d=JSON.parse(ev.target.result); if(Array.isArray(d)&&d.length){setData(d);setSel(null);setShowUpload(false);}}catch(e){alert("Invalid JSON")} };
 r.readAsText(f);
 };

 const API_KEY = apiKey.trim();
 // -- AI CALLS (UPDATED FOR GEMINI) --
 const genEmail = useCallback(async(p)=>{
 setGenning(true); setComp(null); setSent(false);
 try {
 if(!API_KEY) throw new Error("Missing API key");
 const msg = `Generate a personalized outreach email for:\n\nName: ${p.name}\nRole: ${p.current_role}\nLocation: ${p.location||"Unknown"}\nICP: ${icpLabel(p.matched_icp)}\nScore: ${p._score}/100\nSummary: ${p.summary}\nWhy Now: ${(p.why_now_reasons||[]).join("; ")||"None"}\nMatch: ${(p.match_reasons||[]).join("; ")}\nAngle: ${p.recommended_outreach_angle}\nAvoid: ${(p.concerns||[]).join("; ")||"None"}`;
 const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:EMAIL_PROMPT}]},contents:[{role:"user",parts:[{text:msg}]}]})});
 const d = await res.json();
 if(!res.ok) throw new Error(d?.error?.message || "Email generation failed");
 const txt = getGeminiText(d);
 const lines = txt.split("\n");
 let s = `Tax Strategy for ${p.name}`, b = txt;
 if(lines[0]?.toLowerCase().startsWith("subject:")){ s=lines[0].replace(/^subject:\s*/i,"").trim(); b=lines.slice(1).join("\n").trim(); }
 setSubj(s);setBody(b);setESubj(s);setEBody(b); return {subject:s,body:b};
 } catch(e) {
 const local = localDraftForProspect(p);
 setBody(local.body);setEBody(local.body);setSubj(local.subject);setESubj(local.subject); return local;
 } finally { setGenning(false); }
 },[API_KEY]);

 const checkComp = useCallback(async(b,s)=>{
 setChecking(true);
 try {
 if(!API_KEY) throw new Error("Missing API key");
 const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:COMPLIANCE_PROMPT}]},generationConfig:{responseMimeType:"application/json"},contents:[{role:"user",parts:[{text:`Review this email:\n\nSubject: ${s}\n\n${b}`}]}]})});
 const d = await res.json();
 if(!res.ok) throw new Error(d?.error?.message || "Compliance check failed");
 const txt = getGeminiText(d);
 const r = normalizeComplianceResult(parseModelJson(txt));
 setComp(r);
 addToast("Compliance check complete", "info");
 return r;
 } catch(e) {
 const fb = localComplianceCheck(b,s);
 setComp(fb);
 addToast("Compliance check complete", "info");
 return fb;
 }
 finally { setChecking(false); }
 },[API_KEY, addToast]);

 const runAuto = useCallback(async(p)=>{
 setAutoRun(true); setTab("email");
 const {subject:s1,body:b1} = await genEmail(p);
 const r1 = await checkComp(b1,s1);
 if(!r1.passed && r1.flags?.length) {
 const fixes = r1.flags.map(f=>`- "${f.phrase}" -> "${f.suggestion}" (Rule ${f.rule})`).join("\n");
 try {
 if(!API_KEY) throw new Error("Missing API key");
 const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:EMAIL_PROMPT}]},contents:[{role:"user",parts:[{text:`Rewrite fixing ALL compliance issues. Keep personalization.\n\nOriginal:\nSubject: ${s1}\n\n${b1}\n\nFixes needed:\n${fixes}\n\nReturn corrected email with Subject: line.`}]}]})});
 const d2 = await res.json();
 if(!res.ok) throw new Error(d2?.error?.message || "Compliance rewrite failed");
 const t2 = getGeminiText(d2) || b1;
 const ls = t2.split("\n");
 let s2=s1, b2=t2;
 if(ls[0]?.toLowerCase().startsWith("subject:")){ s2=ls[0].replace(/^subject:\s*/i,"").trim(); b2=ls.slice(1).join("\n").trim(); }
 setBody(b2);setEBody(b2);setSubj(s2);setESubj(s2);
 await checkComp(b2,s2);
 } catch(e){
 const revised = localDraftForProspect(p);
 setBody(revised.body);setEBody(revised.body);setSubj(revised.subject);setESubj(revised.subject);
 await checkComp(revised.body, revised.subject);
 }
 }
 setAutoRun(false);
 },[API_KEY, genEmail, checkComp]);

 const doSend = useCallback((method)=>{
 if(!sel||!comp?.passed) return;
 const entry = { id:Date.now(), ts:new Date().toISOString(), name:sel.name, role:sel.current_role, loc:sel.location, linkedin:sel.linkedin_url, icp:sel.icp_match_score, urg:sel.urgency_score, composite:sel._score, category:sel.matched_icp, subject:eSubj, body:eBody, passed:comp.passed, confidence:comp.confidence, summary:comp.summary, flags:comp.flags||[], good:comp.compliant_elements||[], mode, method };
 setAudit(prev=>[entry,...prev]);
 if(method==="gmail") window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(eSubj)}&body=${encodeURIComponent(eBody)}`,"_blank");
 else if(method==="mailto") window.location.href=`mailto:?subject=${encodeURIComponent(eSubj)}&body=${encodeURIComponent(eBody)}`;
 setSent(true);
 addToast("Email approved and logged", "success");
 },[sel,comp,eBody,eSubj,mode,addToast]);

 const pick = useCallback((p)=>{ setSel(p); setBody(""); setSubj(""); setEBody(""); setESubj(""); setComp(null); setSent(false); setTab("detail"); setShowAudit(false); },[]);

 // -- FEATURE 1: KEYBOARD NAVIGATION --
 useEffect(() => {
 const handler = (e) => {
 const tag = document.activeElement?.tagName?.toLowerCase();
 if (tag === "input" || tag === "textarea" || tag === "select") return;
 const key = e.key;
 if (key === "ArrowDown" || key === "ArrowUp") {
 e.preventDefault();
 const idx = sel ? prospects.findIndex(p => p.linkedin_url === sel.linkedin_url) : -1;
 const next = key === "ArrowDown" ? Math.min(idx + 1, prospects.length - 1) : Math.max(idx - 1, 0);
 if (prospects[next]) pick(prospects[next]);
 }
 if (key === "g" || key === "G") {
 if (sel && !isDNC(sel)) {
 if (mode === "autonomous") runAuto(sel);
 else genEmail(sel).then(() => setTab("email"));
 } else if (sel && isDNC(sel)) {
 addToast("Cannot contact - DNC list", "error");
 }
 }
 if ((key === "c" || key === "C") && eBody) {
 checkComp(eBody, eSubj); setTab("compliance");
 }
 if (key === "Enter" && comp?.passed && !sent) { doSend("log"); }
 if (key === "Escape") { setSel(null); setShowAudit(false); }
 };
 window.addEventListener("keydown", handler);
 return () => window.removeEventListener("keydown", handler);
 }, [sel, prospects, mode, eBody, eSubj, comp, sent, pick, runAuto, genEmail, checkComp, doSend, addToast]);

 // -- FEATURE 9: CSV EXPORT --
 const exportCSV = useCallback(() => {
 const rows = [["Name","Role","Location","Subject","Mode","Method","Confidence","Result","Timestamp"]];
 filteredAudit.forEach(e => {
 rows.push([e.name, e.role, e.loc, `"${(e.subject||"").replace(/"/g,'""')}"`, e.mode, e.method, e.confidence, e.passed?"Passed":"Failed", e.ts]);
 });
 const csv = rows.map(r => r.join(",")).join("\n");
 const blob = new Blob([csv], { type: "text/csv" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a"); a.href = url; a.download = "audit_trail.csv"; a.click();
 URL.revokeObjectURL(url);
 }, [filteredAudit]);

 // -- STYLES --
 const V = {
 green: "#1B4332", greenMid: "#2D6A4F", greenLight: "#40916C",
 mint: "#B7E4C7", gold: "#C9A84C", offWhite: "#F8F6F1",
 white: "#FFFFFF", dark: "#1A1A1A", mid: "#4A4A4A", light: "#767676", border: "#D4D4C8",
 red: "#9B2C2C", redBg: "#FFF5F5", greenBg: "#F0FFF4",
 };

 const sideW = sideCollapsed ? 52 : 340;

 return (
 <div style={{fontFamily:"'Lato',sans-serif",background:V.offWhite,color:V.dark,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
 <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2D6A4F40;border-radius:3px}
::selection{background:#B7E4C7;color:#1B4332}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes toastIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes toastOut{from{transform:translateX(0);opacity:1}to{transform:translateX(120%);opacity:0}}
@keyframes stepFill{from{width:0}to{width:100%}}
.card-h{transition:all .2s ease;border-left:3px solid transparent}
.card-h:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(27,67,50,.08);border-left-color:#2D6A4F}
.card-h.card-sent:hover{border-left-color:#40916C}
.card-h.card-dnc:hover{border-left-color:#9B2C2C}
.shim{background:linear-gradient(90deg,#e8e6e1 25%,#d4d2cd 50%,#e8e6e1 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:4px}
textarea,input,button,select{font-family:'Lato',sans-serif}
.gold-btn{background:#C9A84C;color:#1A1A1A;border:none;padding:9px 20px;border-radius:4px;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;letter-spacing:.02em}
.gold-btn:hover{background:#b8953f;box-shadow:0 2px 8px rgba(201,168,76,.3)}
.gold-btn:disabled{background:#D4D4C8;color:#767676;cursor:not-allowed;box-shadow:none}
.green-btn{background:transparent;color:#1B4332;border:1.5px solid #1B4332;padding:8px 18px;border-radius:4px;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s}
.green-btn:hover{background:#1B4332;color:white}
.ghost-btn{background:transparent;color:white;border:1.5px solid rgba(255,255,255,.6);padding:8px 18px;border-radius:4px;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s}
.ghost-btn:hover{background:rgba(255,255,255,.15);border-color:white}
 `}</style>

 {/* === HEADER === */}
 <header style={{background:V.green,padding:"0 20px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,borderBottom:`2px solid ${V.gold}40`}}>
 <div style={{display:"flex",alignItems:"center",gap:20}}>
 <div style={{display:"flex",alignItems:"baseline",gap:8}}>
 <span style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:V.white,letterSpacing:"-.02em"}}>Finvisor</span>
 </div>
 <div style={{width:1,height:28,background:`${V.white}20`,margin:"0 4px"}}/>
 <span style={{fontSize:11,color:`${V.white}90`,letterSpacing:".04em"}}>The Compliant Prospector</span>
 </div>
 <div style={{display:"flex",alignItems:"center",gap:10}}>
 <div style={{display:"flex",borderRadius:4,overflow:"hidden",border:`1px solid ${V.white}30`}}>
 <button onClick={()=>setMode("autonomous")} style={{padding:"6px 14px",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:".03em",fontFamily:"'Lato',sans-serif",background:mode==="autonomous"?V.gold:"transparent",color:mode==="autonomous"?V.dark:`${V.white}90`,transition:"all .2s"}}>AUTONOMOUS</button>
 <button onClick={()=>setMode("reviewer")} style={{padding:"6px 14px",border:"none",borderLeft:`1px solid ${V.white}20`,cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:".03em",fontFamily:"'Lato',sans-serif",background:mode==="reviewer"?V.gold:"transparent",color:mode==="reviewer"?V.dark:`${V.white}90`,transition:"all .2s"}}>REVIEWER</button>
 </div>
 <button onClick={()=>{setShowAudit(!showAudit);if(!showAudit)setSel(null)}} className="ghost-btn" style={{padding:"6px 14px",fontSize:11,display:"flex",alignItems:"center",gap:6}}>
 AUDIT TRAIL {audit.length>0&&<span style={{background:V.gold,color:V.dark,borderRadius:10,padding:"0 6px",fontSize:10,fontWeight:700}}>{audit.length}</span>}
 </button>
 <button onClick={()=>setShowUpload(!showUpload)} className="ghost-btn" style={{padding:"6px 14px",fontSize:11}}>LOAD DATA</button>
 </div>
 </header>

 {showUpload&&(
 <div style={{background:V.white,borderBottom:`1px solid ${V.border}`,padding:"10px 28px",display:"flex",alignItems:"center",gap:12,animation:"fadeUp .2s ease",flexWrap:"wrap"}}>
 <span style={{fontSize:12,color:V.mid}}>Import scored.json ({data.length.toLocaleString()} prospects loaded):</span>
 <input type="file" accept=".json" onChange={handleFile} style={{fontSize:12,color:V.mid}} />
 <span style={{fontSize:12,color:V.mid,marginLeft:6}}>Gemini API key:</span>
 <input value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="Paste Gemini API key (optional)" style={{fontSize:12,color:V.mid,border:`1px solid ${V.border}`,borderRadius:4,padding:"8px 10px",minWidth:280,background:V.offWhite}} />
 {apiKey&&<button className="green-btn" onClick={()=>setApiKey("")} style={{fontSize:11,padding:"7px 12px"}}>Clear Key</button>}
 <button onClick={()=>setShowUpload(false)} style={{background:"none",border:"none",cursor:"pointer",color:V.light,fontSize:14}}>X</button>
 </div>
 )}

 {/* === BODY === */}
 <div style={{display:"flex",flex:1,overflow:"hidden"}}>

 {/* --- LEFT: PROSPECT LIST (FEATURE 11: COLLAPSIBLE) --- */}
 <div style={{width:sideW,borderRight:`1px solid ${V.border}`,display:"flex",flexDirection:"column",flexShrink:0,background:V.white,transition:"width .25s ease",position:"relative",overflow:"hidden"}}>

 {/* Collapse toggle */}
 <button onClick={()=>setSideCollapsed(!sideCollapsed)} style={{position:"absolute",right:-1,top:"50%",transform:"translateY(-50%)",zIndex:20,width:20,height:36,background:V.green,color:V.white,border:"none",borderRadius:"0 6px 6px 0",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"2px 0 6px rgba(0,0,0,.12)"}}>
 {sideCollapsed ? ">" : "<"}
 </button>

 {!sideCollapsed ? (
 <>
 {/* Search */}
 <div style={{padding:"14px 16px",borderBottom:`1px solid ${V.border}`}}>
 <div style={{position:"relative"}}>
 <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search prospects..." style={{width:"100%",padding:"9px 12px 9px 34px",borderRadius:4,border:`1px solid ${V.border}`,background:V.offWhite,color:V.dark,fontSize:13,outline:"none"}} />
 <span style={{position:"absolute",left:10,top:10,fontSize:14,color:V.light}}></span>
 </div>
 <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>
 <button onClick={()=>setFICP("all")} style={{padding:"3px 9px",borderRadius:3,border:`1px solid ${fICP==="all"?V.greenMid:V.border}`,background:fICP==="all"?V.mint+"40":"transparent",color:fICP==="all"?V.green:V.light,cursor:"pointer",fontSize:10,fontWeight:600}}>All</button>
 {icpOpts.map(([k,n])=>(
 <button key={k} onClick={()=>setFICP(fICP===k?"all":k)} style={{padding:"3px 9px",borderRadius:3,border:`1px solid ${fICP===k?V.greenMid:V.border}`,background:fICP===k?V.mint+"40":"transparent",color:fICP===k?V.green:V.light,cursor:"pointer",fontSize:10,fontWeight:600}}>
 {icpLabel(k).split(" / ")[0].trim().substring(0,16)} ({n})
 </button>
 ))}
 </div>
 <div style={{display:"flex",gap:4,marginTop:5}}>
 {["all","Priority","High","Medium","Low"].map(t=>{
 const c=t==="Priority"?V.red:t==="High"?V.gold:t==="Medium"?V.greenMid:t==="Low"?V.light:V.greenMid;
 return <button key={t} onClick={()=>setFTier(fTier===t?"all":t)} style={{padding:"2px 8px",borderRadius:3,border:`1px solid ${fTier===t?c:V.border}`,background:fTier===t?c+"18":"transparent",color:fTier===t?c:V.light,cursor:"pointer",fontSize:10,fontWeight:600}}>{t==="all"?"All Tiers":t}</button>;
 })}
 </div>
 </div>
 <div style={{padding:"6px 16px",fontSize:10,color:V.light,borderBottom:`1px solid ${V.border}20`,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>
 {prospects.length} prospects, ranked by composite score
 </div>
 {/* Full cards */}
 <div style={{flex:1,overflow:"auto",padding:"4px 6px"}}>
 {prospects.map((p,i)=>{
 const t=tier(p._score); const isSel=sel?.linkedin_url===p.linkedin_url; const wasSent=audit.some(a=>a.name===p.name); const dnc=isDNC(p);
 return (
 <div key={p.linkedin_url||p.name+i} className={`card-h${wasSent?" card-sent":""}${dnc?" card-dnc":""}`} onClick={()=>pick(p)} title={dnc?"Do Not Contact":""} style={{
 padding:"12px 14px",borderRadius:6,cursor:"pointer",marginBottom:3,position:"relative",textAlign:"left",
 background:isSel?V.greenBg:dnc?V.redBg+"20":wasSent?V.mint+"15":V.white,
 borderColor:isSel?V.greenMid:"transparent",
 opacity:dnc?.45:1,
 animation:`fadeUp .25s ease ${Math.min(i*.02,.6)}s both`,
 }}>
 {/* FEATURE 4+10: Top-right badges */}
 <div style={{position:"absolute",top:6,right:8,display:"flex",gap:3}}>
 {wasSent&&<span style={{fontSize:8,background:V.greenMid,color:V.white,padding:"1px 6px",borderRadius:10,fontWeight:700}}>SENT</span>}
 {dnc&&<span style={{fontSize:8,background:V.red,color:V.white,padding:"1px 6px",borderRadius:10,fontWeight:700}}>DNC</span>}
 </div>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
 <div style={{flex:1,minWidth:0}}>
 <span style={{fontSize:13,fontWeight:700,color:V.dark,fontFamily:"'Playfair Display',serif"}}>{p.name}</span>
 <div style={{fontSize:11,color:V.mid,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.current_role}</div>
 <div style={{fontSize:10,color:V.light,marginTop:1}}>{p.location||" - "}</div>
 </div>
 <div style={{textAlign:"right",flexShrink:0,marginLeft:8,marginTop:8}}>
 <div style={{fontSize:20,fontWeight:700,fontFamily:"'Playfair Display',serif",color:t.color}}>{p._score}</div>
 <div style={{fontSize:9,fontWeight:700,color:t.color,letterSpacing:".08em",textTransform:"uppercase"}}>{t.label}</div>
 </div>
 </div>
 <div style={{display:"flex",gap:4,marginTop:6}}>
 <span style={{fontSize:9,color:V.greenMid,background:V.mint+"30",padding:"1px 6px",borderRadius:2,fontWeight:600}}>ICP {p.icp_match_score}</span>
 <span style={{fontSize:9,color:V.gold,background:V.gold+"18",padding:"1px 6px",borderRadius:2,fontWeight:600}}>URG {p.urgency_score}</span>
 <span style={{fontSize:9,color:V.greenLight,padding:"1px 6px",borderRadius:2,border:`1px solid ${V.border}`}}>{icpLabel(p.matched_icp)}</span>
 </div>
 </div>
 );
 })}
 </div>
 </>
 ) : (
 /* FEATURE 11: Collapsed - initials only */
 <div style={{flex:1,overflow:"auto",paddingTop:8,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
 {prospects.map((p,i)=>{
 const isSel=sel?.linkedin_url===p.linkedin_url;
 const wasSent=audit.some(a=>a.name===p.name);
 const dnc=isDNC(p);
 return (
 <div key={p.linkedin_url||p.name+i} onClick={()=>pick(p)} title={p.name + (dnc?" - DNC":"")} style={{
 width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
 fontSize:12,fontWeight:700,fontFamily:"'Playfair Display',serif",
 background:isSel?V.greenMid:dnc?V.red+"30":wasSent?V.mint:V.offWhite,
 color:isSel?V.white:dnc?V.red:V.green,
 border:`2px solid ${isSel?V.greenMid:dnc?V.red+"40":"transparent"}`,
 transition:"all .15s",opacity:dnc?.5:1,
 }}>
 {p.name.charAt(0)}
 </div>
 );
 })}
 </div>
 )}
 </div>

 {/* --- RIGHT: DETAIL --- */}
 <div ref={rightPanelRef} style={{flex:1,overflow:"auto",background:V.offWhite}}>
 {showAudit ? (
 /* === AUDIT TRAIL (FEATURE 9: FILTERS + CSV) === */
 <div style={{padding:"24px 28px",animation:"fadeUp .3s ease"}}>
 <div style={{marginBottom:24}}>
 <div style={{fontSize:10,color:V.greenMid,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>Compliance Records</div>
 <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:V.dark,fontWeight:700}}>Audit Trail</h2>
 <p style={{fontSize:13,color:V.light,marginTop:4}}>{audit.length} emails logged with full regulatory documentation</p>
 <div style={{width:48,height:2,background:V.gold,marginTop:12}}/>
 </div>
 {/* Filter row */}
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
 <div style={{display:"flex",gap:4}}>
 {["all","passed","failed"].map(f=>(
 <button key={f} onClick={()=>setAuditFilter(f)} style={{padding:"4px 12px",borderRadius:4,border:`1px solid ${auditFilter===f?V.greenMid:V.border}`,background:auditFilter===f?V.greenMid:V.white,color:auditFilter===f?V.white:V.mid,fontSize:11,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{f}</button>
 ))}
 </div>
 <button className="green-btn" onClick={exportCSV} style={{fontSize:11,padding:"5px 14px"}}>Export CSV</button>
 </div>
 {filteredAudit.length===0?(
 <div style={{textAlign:"center",padding:"60px 20px",color:V.light}}>
 <div style={{fontSize:36,marginBottom:12,opacity:.3}}></div>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:V.mid}}>No Records Yet</div>
 <div style={{fontSize:13,marginTop:6}}>Audit entries appear here after emails are approved and sent.</div>
 </div>
 ):filteredAudit.map((e,i)=>(
 <div key={e.id} style={{background:V.white,borderRadius:8,padding:20,marginBottom:12,border:`1px solid ${V.border}`,animation:`fadeUp .2s ease ${i*.03}s both`}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
 <div>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:600,color:V.dark}}>{e.name}</div>
 <div style={{fontSize:11,color:V.light}}>{e.role} / {e.loc}</div>
 </div>
 <div style={{textAlign:"right"}}>
 <div style={{fontSize:11,color:V.light}}>{fmtDate(e.ts)}</div>
 <div style={{display:"flex",gap:4,marginTop:4,justifyContent:"flex-end"}}>
 <span style={{fontSize:9,padding:"2px 8px",borderRadius:3,fontWeight:700,letterSpacing:".05em",background:e.passed?V.greenMid:V.red,color:V.white}}>{e.passed?"PASSED":"FAILED"}</span>
 <span style={{fontSize:9,padding:"2px 8px",borderRadius:3,background:V.offWhite,color:V.mid,fontWeight:600}}>{e.mode}</span>
 <span style={{fontSize:9,padding:"2px 8px",borderRadius:3,background:V.offWhite,color:V.mid,fontWeight:600}}>via {e.method}</span>
 </div>
 </div>
 </div>
 <div style={{fontSize:12,color:V.mid,background:V.offWhite,borderRadius:6,padding:14,whiteSpace:"pre-wrap",maxHeight:110,overflow:"auto",lineHeight:1.6,borderLeft:`3px solid ${V.greenMid}30`}}>
 <div style={{color:V.greenMid,fontWeight:600,marginBottom:4}}>Subject: {e.subject}</div>{e.body}
 </div>
 <div style={{display:"flex",gap:10,marginTop:10,fontSize:11,color:V.light,flexWrap:"wrap"}}>
 <span>Confidence: <b style={{color:V.greenMid}}>{e.confidence}%</b></span>
 <span> / {e.summary}</span>
 {e.flags?.length>0&&<span style={{color:V.gold}}> / ! {e.flags.length} flagged</span>}
 </div>
 </div>
 ))}
 </div>
 ):!sel?(
 /* === EMPTY STATE === */
 <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",minHeight:"80vh",padding:40,textAlign:"center"}}>
 <div style={{width:60,height:2,background:V.gold,marginBottom:24}}/>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,color:V.dark,fontWeight:700,lineHeight:1.3}}>Select a Prospect</div>
 <div style={{fontSize:14,color:V.light,marginTop:10,maxWidth:420,lineHeight:1.7}}>
 Choose from {prospects.length.toLocaleString()} ranked prospects to generate personalized, FINRA/SEC-compliant outreach.
 </div>
 <div style={{display:"flex",gap:16,marginTop:24,width:"100%",maxWidth:560}}>
 <div style={{flex:1,background:V.white,borderRadius:8,padding:"18px 20px",border:`1px solid ${V.border}`,textAlign:"center"}}>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:V.greenMid}}>{data.length.toLocaleString()}</div>
 <div style={{fontSize:10,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",marginTop:4}}>Total Prospects</div>
 </div>
 <div style={{flex:1,background:V.white,borderRadius:8,padding:"18px 20px",border:`1px solid ${V.border}`,textAlign:"center"}}>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:V.gold}}>{audit.length}</div>
 <div style={{fontSize:10,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",marginTop:4}}>Emails Sent</div>
 </div>
 <div style={{flex:1,background:V.white,borderRadius:8,padding:"18px 20px",border:`1px solid ${V.border}`,textAlign:"center"}}>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:V.green}}>{mode==="autonomous"?"Auto":"Manual"}</div>
 <div style={{fontSize:10,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",marginTop:4}}>Current Mode</div>
 </div>
 </div>
 </div>
 ):(
 /* === PROSPECT DETAIL === */
 <div style={{padding:"24px 28px",animation:"fadeUp .25s ease"}}>

 {/* FEATURE 2: WORKFLOW STEP INDICATOR */}
 <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:20}}>
 {[{n:"Draft",done:!!eBody,active:!!sel&&!eBody},{n:"Compliance",done:comp!==null,active:!!eBody&&!comp},{n:"Send",done:sent,active:!!comp?.passed&&!sent}].map((step,i)=>{
 const color = step.done ? V.greenMid : step.active ? V.gold : V.border;
 return (
 <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
 <div style={{display:"flex",alignItems:"center",gap:6}}>
 <div style={{width:24,height:24,borderRadius:"50%",background:color,color:step.done||step.active?V.white:V.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,transition:"all .3s"}}>{step.done?"":i+1}</div>
 <span style={{fontSize:11,fontWeight:600,color:step.done?V.greenMid:step.active?V.gold:V.light,transition:"color .3s"}}>{step.n.split(" ").slice(1).join(" ")}</span>
 </div>
 {i<2&&<div style={{flex:1,height:2,marginLeft:8,marginRight:8,background:V.border,borderRadius:1,position:"relative",overflow:"hidden"}}>
 <div style={{position:"absolute",left:0,top:0,height:"100%",background:step.done?V.greenMid:V.border,transition:"width .4s ease",width:step.done?"100%":"0%"}}/>
 </div>}
 </div>
 );
 })}
 </div>

 {/* Header */}
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
 <div>
 <div style={{fontSize:10,color:V.greenMid,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>{icpLabel(sel.matched_icp)}</div>
 <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
 <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:V.dark,fontWeight:700}}>{sel.name}</h2>
 {(()=>{const t=tier(sel._score); return <span style={{fontSize:10,fontWeight:700,color:t.color,background:t.bg,padding:"3px 12px",borderRadius:3,letterSpacing:".06em"}}>{t.label.toUpperCase()} | {sel._score}</span>})()}
 {isDNC(sel)&&<span style={{fontSize:10,fontWeight:700,color:V.red,background:V.redBg,padding:"3px 12px",borderRadius:3}}>DO NOT CONTACT</span>}
 </div>
 <div style={{fontSize:14,color:V.mid,marginTop:4}}>{sel.current_role}</div>
 <div style={{fontSize:12,color:V.light,marginTop:2}}>{sel.location||"Location not available"}</div>
 <div style={{width:48,height:2,background:V.gold,marginTop:12}}/>
 </div>
 <a href={sel.linkedin_url} target="_blank" rel="noopener noreferrer" className="green-btn" style={{fontSize:11,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>LinkedIn</a>
 </div>

 {/* FEATURE 12: Score Cards with Tooltips */}
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}>
 {[
 {label:"ICP Match",val:sel.icp_match_score,color:V.greenMid},
 {label:"Urgency Score",val:sel.urgency_score,color:V.gold},
 {label:"Composite Rank",val:sel._score,color:tier(sel._score).color},
 ].map(c=>(
 <div key={c.label} style={{background:V.white,borderRadius:8,padding:"16px 18px",border:`1px solid ${V.border}`,borderTop:`3px solid ${c.color}`,position:"relative",cursor:"help"}} onMouseEnter={()=>setHoveredCard(c.label)} onMouseLeave={()=>setHoveredCard(null)}>
 <div style={{fontSize:10,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase"}}>{c.label}</div>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:700,color:c.color,marginTop:4}}>{c.val}</div>
 {hoveredCard===c.label&&(
 <div style={{position:"absolute",bottom:"100%",left:"50%",transform:"translateX(-50%)",marginBottom:8,background:V.dark,color:V.white,fontSize:11,borderRadius:4,padding:"8px 12px",maxWidth:220,zIndex:100,lineHeight:1.5,textAlign:"center",boxShadow:"0 4px 12px rgba(0,0,0,.2)"}}>
 {SCORE_TIPS[c.label]}
 <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:`6px solid ${V.dark}`}}/>
 </div>
 )}
 </div>
 ))}
 </div>

 {/* Tabs */}
 <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`2px solid ${V.border}`}}>
 {[["detail","Prospect Intel"],["email","Email Draft"],["compliance","Compliance"]].map(([k,l])=>(
 <button key={k} onClick={()=>setTab(k)} style={{padding:"10px 20px",border:"none",borderBottom:tab===k?`2px solid ${V.greenMid}`:"2px solid transparent",marginBottom:-2,background:"transparent",color:tab===k?V.greenMid:V.light,fontWeight:600,fontSize:12,cursor:"pointer",letterSpacing:".03em",fontFamily:"'Lato',sans-serif",transition:"all .2s"}}>{l}</button>
 ))}
 </div>

 {/* TAB: DETAIL */}
 {tab==="detail"&&(
 <div style={{animation:"fadeIn .2s ease"}}>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
 <div style={{background:V.white,borderRadius:8,padding:18,border:`1px solid ${V.border}`}}>
 <div style={{fontSize:10,color:V.greenMid,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Summary</div>
 <div style={{fontSize:13,color:V.mid,lineHeight:1.7}}>{sel.summary}</div>
 </div>
 <div style={{background:V.white,borderRadius:8,padding:18,border:`1px solid ${V.border}`}}>
 <div style={{fontSize:10,color:V.gold,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Why Now</div>
 {(sel.why_now_reasons||[]).length>0 ? sel.why_now_reasons.map((r,i)=>(
 <div key={i} style={{fontSize:12,color:V.mid,marginBottom:6,paddingLeft:12,borderLeft:`2px solid ${V.gold}40`,lineHeight:1.6}}>{r}</div>
 )):<div style={{fontSize:12,color:V.light,fontStyle:"italic"}}>No urgent signals detected</div>}
 </div>
 <div style={{background:V.white,borderRadius:8,padding:18,border:`1px solid ${V.border}`}}>
 <div style={{fontSize:10,color:V.greenLight,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Outreach Angle</div>
 <div style={{fontSize:12,color:V.greenMid,lineHeight:1.7}}>{sel.recommended_outreach_angle}</div>
 </div>
 <div style={{background:V.white,borderRadius:8,padding:18,border:`1px solid ${V.border}`}}>
 <div style={{fontSize:10,color:V.red,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Concerns</div>
 {(sel.concerns||[]).length>0 ? sel.concerns.map((c,i)=>(
 <div key={i} style={{fontSize:11,color:V.mid,marginBottom:3,lineHeight:1.5}}>- {c}</div>
 )):<div style={{fontSize:12,color:V.light,fontStyle:"italic"}}>No concerns noted</div>}
 </div>
 </div>
 <div style={{background:V.white,borderRadius:8,padding:18,border:`1px solid ${V.border}`}}>
 <div style={{fontSize:10,color:V.greenMid,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Match Reasons</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
 {(sel.match_reasons||[]).map((r,i)=>(
 <span key={i} style={{fontSize:11,background:V.mint+"25",color:V.green,padding:"4px 10px",borderRadius:4,lineHeight:1.4}}>{r}</span>
 ))}
 </div>
 </div>
 <div style={{marginTop:20,padding:20,background:V.white,borderRadius:8,border:`1px solid ${V.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
 <div>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:600,color:V.dark}}>
 {mode==="autonomous"?"Ready to Auto-Prospect":"Ready to Draft"}
 </div>
 <div style={{fontSize:12,color:V.light,marginTop:2}}>
 {mode==="autonomous"?"AI will draft, check, and self-correct in one click":"Generate a draft, then review before compliance check"}
 <span style={{color:V.greenMid,marginLeft:8,fontSize:11}}>(Press G)</span>
 </div>
 </div>
 {mode==="autonomous"?(
 <button className="gold-btn" onClick={()=>{if(isDNC(sel)){addToast("Cannot contact - DNC list","error");return;} runAuto(sel);}} disabled={autoRun||isDNC(sel)} style={{opacity:autoRun||isDNC(sel)?.5:1,display:"flex",alignItems:"center",gap:6}}>
 {autoRun?<><span style={{animation:"pulse 1s infinite"}}>-</span> Processing...</>:" Auto-Draft & Check"}
 </button>
 ):(
 <button className="gold-btn" onClick={()=>{if(isDNC(sel)){addToast("Cannot contact - DNC list","error");return;} genEmail(sel).then(()=>setTab("email"));}} disabled={genning||isDNC(sel)} style={{opacity:genning||isDNC(sel)?.5:1}}>
 {genning?"Generating...":" Generate Draft"}
 </button>
 )}
 </div>
 </div>
 )}

 {/* TAB: EMAIL (FEATURES 5, 7, 8) */}
 {tab==="email"&&(
 <div style={{animation:"fadeIn .2s ease"}}>
 {/* FEATURE 5: Empty state */}
 {!eBody && !genning && !autoRun ? (
 <div style={{background:V.white,borderRadius:8,padding:"60px 40px",border:`1px solid ${V.border}`,textAlign:"center"}}>
 <div style={{fontSize:40,marginBottom:12,opacity:.4}}></div>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:V.dark,fontWeight:600}}>No Draft Yet</div>
 <div style={{fontSize:13,color:V.light,marginTop:8,maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>Generate a draft from the Prospect Intel tab to get started.</div>
 <button className="gold-btn" onClick={()=>setTab("detail")} style={{marginTop:16}}>Go to Prospect Intel</button>
 </div>
 ) : (
 <>
 {(genning||autoRun)&&!eBody&&(
 <div style={{background:V.white,borderRadius:8,padding:40,border:`1px solid ${V.border}`,textAlign:"center"}}>
 {[75,92,60,85].map((w,i)=><div key={i} className="shim" style={{height:12,marginBottom:8,width:`${w}%`,marginLeft:"auto",marginRight:"auto"}} />)}
 <div style={{marginTop:16,fontSize:12,color:V.light}}>{autoRun?"Auto-generating and checking compliance...":"Crafting personalized email..."}</div>
 </div>
 )}
 {eBody&&(
 <div style={{background:V.white,borderRadius:8,padding:22,border:`1px solid ${V.border}`}}>
 <div style={{marginBottom:12}}>
 <label style={{fontSize:10,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",display:"block",marginBottom:4}}>Subject Line</label>
 <input value={eSubj} onChange={e=>{setESubj(e.target.value);setComp(null);setSent(false)}} style={{width:"100%",padding:"10px 14px",borderRadius:4,border:`1px solid ${V.border}`,background:V.offWhite,color:V.dark,fontSize:14,fontWeight:600,outline:"none"}} />
 </div>
 <div>
 <label style={{fontSize:10,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",display:"block",marginBottom:4}}>
 Email Body
 {mode==="reviewer"&&<span style={{color:V.gold,fontWeight:400,textTransform:"none",letterSpacing:0,marginLeft:8}}> - edit before running compliance</span>}
 </label>
 <textarea value={eBody} onChange={e=>{setEBody(e.target.value);setComp(null);setSent(false)}} rows={10} style={{width:"100%",padding:14,borderRadius:4,border:`1px solid ${V.border}`,background:V.offWhite,color:V.dark,fontSize:13,lineHeight:1.8,resize:"vertical",outline:"none"}} />
 </div>
 {/* FEATURE 7: Compliance Status Banner */}
 <div style={{marginTop:14,padding:"10px 14px",borderRadius:6,animation:"fadeIn .2s ease",
 background:compStatus==="idle"?V.offWhite:compStatus==="passed"?V.greenBg:compStatus==="failed"?V.redBg:"#FFF8E8",
 border:`1px solid ${compStatus==="idle"?V.border:compStatus==="passed"?V.greenMid+"40":compStatus==="failed"?V.red+"40":V.gold+"50"}`,
 borderLeft:`4px solid ${compStatus==="idle"?V.border:compStatus==="passed"?V.greenMid:compStatus==="failed"?V.red:V.gold}`,
 }}>
 <div style={{fontSize:12,fontWeight:600,color:compStatus==="idle"?V.mid:compStatus==="passed"?V.greenMid:compStatus==="failed"?V.red:V.gold}}>
 {comp===null?"Run a compliance check before sending."
 :compStatus==="passed"?" Compliance passed - this email is cleared to send."
 :compStatus==="failed"?"X Compliance failed - fix flagged issues before sending."
 :"Compliance could not be verified right now - retry the check before sending."}
 </div>
 </div>
 {mode==="reviewer"&&(
 <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
 <button className="green-btn" onClick={()=>{checkComp(eBody,eSubj);setTab("compliance")}} disabled={checking} style={{opacity:checking?.5:1,fontSize:12}}>
 {checking?"Checking...":" Run Compliance (C)"}
 </button>
 </div>
 )}
 </div>
 )}
 </>
 )}

 {/* FEATURE 8: Sticky Send Bar */}
 {eBody&&(
 <div style={{position:"sticky",bottom:0,background:V.white,borderTop:`1px solid ${V.border}`,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginTop:16,borderRadius:"0 0 8px 8px",boxShadow:"0 -2px 8px rgba(0,0,0,.04)"}}>
 {sent?(
 <div style={{display:"flex",alignItems:"center",gap:8}}>
 <span style={{fontSize:18}}></span>
 <span style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:V.greenMid}}>Email approved and logged to audit trail</span>
 </div>
 ):(
 <>
 <div style={{fontSize:12,color:V.mid}}>
 {comp?.passed?"Ready to send - choose delivery method:":compStatus==="error"?"Retry compliance verification to unlock send":"Complete compliance check to unlock send"}
 </div>
 <div style={{display:"flex",gap:8}}>
 <button className="gold-btn" onClick={()=>doSend("log")} disabled={!comp?.passed}> Approve & Log</button>
 <button className="green-btn" onClick={()=>doSend("gmail")} disabled={!comp?.passed} style={{opacity:comp?.passed?1:.4}}> Gmail</button>
 <button className="green-btn" onClick={()=>doSend("mailto")} disabled={!comp?.passed} style={{opacity:comp?.passed?1:.4}}> Mail App</button>
 </div>
 </>
 )}
 </div>
 )}
 </div>
 )}

 {/* TAB: COMPLIANCE */}
 {tab==="compliance"&&(
 <div style={{animation:"fadeIn .2s ease"}}>
 {!comp&&!checking?(
 <div style={{background:V.white,borderRadius:8,padding:40,border:`1px solid ${V.border}`,textAlign:"center"}}>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:V.mid}}>No Compliance Check Yet</div>
 <div style={{fontSize:13,color:V.light,marginTop:8,maxWidth:380,marginLeft:"auto",marginRight:"auto"}}>
 {eBody?"Run a compliance check on the current email draft.":"Generate an email draft first, then check compliance."}
 </div>
 {eBody&&<button className="gold-btn" onClick={()=>checkComp(eBody,eSubj)} style={{marginTop:16}} disabled={checking}>{checking?"Checking...":" Run Compliance Check"}</button>}
 </div>
 ):checking?(
 <div style={{background:V.white,borderRadius:8,padding:40,border:`1px solid ${V.border}`,textAlign:"center"}}>
 {[70,90,55,80].map((w,i)=><div key={i} className="shim" style={{height:10,marginBottom:8,width:`${w}%`,marginLeft:"auto",marginRight:"auto"}} />)}
 <div style={{marginTop:14,fontSize:12,color:V.light}}>Scanning against FINRA/SEC regulatory framework...</div>
 </div>
 ):(
 <>
 <div style={{background:V.white,borderRadius:8,padding:22,border:`1px solid ${compStatus==="passed"?V.greenMid+"40":compStatus==="failed"?V.red+"40":V.gold+"50"}`,borderTop:`4px solid ${compStatus==="passed"?V.greenMid:compStatus==="failed"?V.red:V.gold}`,marginBottom:12}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
 <div style={{display:"flex",alignItems:"center",gap:14}}>
 <div style={{width:44,height:44,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,background:compStatus==="passed"?V.greenBg:compStatus==="failed"?V.redBg:"#FFF8E8"}}>
 {compStatus==="passed"?"":compStatus==="failed"?"X":"!"}
 </div>
 <div>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:compStatus==="passed"?V.greenMid:compStatus==="failed"?V.red:V.gold}}>
 {compStatus==="passed"?"Compliance Passed":compStatus==="failed"?"Compliance Failed":"Compliance Check Unavailable"}
 </div>
 <div style={{fontSize:12,color:V.mid,marginTop:2}}>{comp.summary}</div>
 </div>
 </div>
 <div style={{textAlign:"right"}}>
 <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:comp.confidence>=80?V.greenMid:comp.confidence>=50?V.gold:V.red}}>{comp.confidence}%</div>
 <div style={{fontSize:9,color:V.light,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase"}}>Confidence</div>
 </div>
 </div>
 </div>
 {comp.flags?.length>0&&(
 <div style={{marginBottom:12}}>
 <div style={{fontSize:10,color:V.red,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Flagged Phrases ({comp.flags.length})</div>
 {comp.flags.map((f,i)=>(
 <div key={i} style={{background:V.white,borderRadius:6,padding:14,marginBottom:8,border:`1px solid ${V.border}`,borderLeft:`4px solid ${f.severity==="high"?V.red:f.severity==="medium"?V.gold:V.greenLight}`}}>
 <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,flexWrap:"wrap",gap:4}}>
 <span style={{fontSize:12,fontWeight:600,color:V.red,fontStyle:"italic"}}>&ldquo;{f.phrase}&rdquo;</span>
 <span style={{fontSize:9,padding:"2px 8px",borderRadius:3,fontWeight:700,letterSpacing:".04em",background:f.severity==="high"?V.red:f.severity==="medium"?V.gold:V.greenLight,color:V.white}}>
 {f.severity?.toUpperCase()} | RULE {f.rule}
 </span>
 </div>
 <div style={{fontSize:12,color:V.mid,marginBottom:6,lineHeight:1.5}}>{f.explanation}</div>
 <div style={{fontSize:12,color:V.greenMid,background:V.greenBg,padding:"8px 12px",borderRadius:4,borderLeft:`3px solid ${V.greenMid}`}}>
 <b>Suggested:</b> &ldquo;{f.suggestion}&rdquo;
 </div>
 </div>
 ))}
 </div>
 )}
 {comp.compliant_elements?.length>0&&(
 <div>
 <div style={{fontSize:10,color:V.greenMid,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Compliant Elements</div>
 <div style={{background:V.white,borderRadius:6,padding:14,border:`1px solid ${V.border}`,display:"flex",flexWrap:"wrap",gap:6}}>
 {comp.compliant_elements.map((e,i)=>(
 <span key={i} style={{fontSize:11,background:V.mint+"30",color:V.green,padding:"4px 12px",borderRadius:4,fontWeight:500}}> {e}</span>
 ))}
 </div>
 </div>
 )}
 {compStatus==="failed"&&eBody&&(
 <div style={{marginTop:16,padding:16,background:V.offWhite,borderRadius:6,border:`1px solid ${V.gold}40`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
 <span style={{fontSize:12,color:V.mid}}>Fix flagged issues in the Email tab, then re-check.</span>
 <button className="green-btn" onClick={()=>setTab("email")} style={{fontSize:12}}>Edit Email</button>
 </div>
 )}
 </>
 )}
 </div>
 )}
 </div>
 )}
 </div>
 </div>

 {/* FEATURE 3: TOAST CONTAINER */}
 <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8}}>
 {toasts.map(t=>{
 const borderColor = t.type==="success"?V.greenMid:t.type==="error"?V.red:V.gold;
 return (
 <div key={t.id} style={{background:V.white,color:V.dark,padding:"10px 16px",borderRadius:6,borderLeft:`4px solid ${borderColor}`,boxShadow:"0 4px 16px rgba(0,0,0,.12)",fontSize:13,fontWeight:500,animation:"toastIn .3s ease",minWidth:240,maxWidth:360}}>
 {t.message}
 </div>
 );
 })}
 </div>

 {/* FEATURE 1: KEYBOARD SHORTCUT LEGEND */}
 <div onMouseEnter={()=>setShowKB(true)} onMouseLeave={()=>setShowKB(false)} style={{position:"fixed",bottom:16,left:16,zIndex:9998}}>
 {!showKB ? (
 <div style={{background:V.green,color:V.white,width:32,height:32,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.2)"}}>
 
 </div>
 ) : (
 <div style={{background:V.white,borderRadius:8,padding:"14px 18px",boxShadow:"0 4px 20px rgba(0,0,0,.15)",border:`1px solid ${V.border}`,animation:"fadeUp .2s ease",minWidth:200}}>
 <div style={{fontSize:11,fontWeight:700,color:V.greenMid,letterSpacing:".06em",textTransform:"uppercase",marginBottom:8}}>Keyboard Shortcuts</div>
 {[
 ["Up/Down","Navigate prospects"],
 ["G","Generate / Auto-Draft"],
 ["C","Run Compliance"],
 ["Enter","Approve & Log"],
 ["Esc","Deselect prospect"],
 ].map(([k,d])=>(
 <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
 <span style={{fontSize:11,color:V.mid}}>{d}</span>
 <kbd style={{fontSize:10,background:V.offWhite,border:`1px solid ${V.border}`,borderRadius:3,padding:"1px 6px",color:V.dark,fontFamily:"'Lato',sans-serif",fontWeight:600}}>{k}</kbd>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
