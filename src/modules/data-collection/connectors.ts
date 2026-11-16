import { RawNotificationItem } from './types';

export interface SourceConnector {
  code: string;
  name: string;
  fetchUpdates(): Promise<RawNotificationItem[]>;
}

export class UPSCConnector implements SourceConnector {
  code = 'UPSC';
  name = 'Union Public Service Commission';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    // Official public notices simulator / parser based on upsc.gov.in
    return [
      {
        title: 'UPSC Combined Geo-Scientist (Preliminary) Examination 2026 Notice',
        sourceReference: 'UPSC-2026-GEO-SCIENTIST',
        officialUrl: 'https://upsc.gov.in/examinations/Combined-Geo-Scientist-Examination-2026',
        pdfUrl: 'https://upsc.gov.in/sites/default/files/Notice-GeoScientist-2026.pdf',
        categorySlug: 'latest-jobs',
        extractedDate: '2026-03-10',
        details: 'Recruitment for Geologist, Geophysicist, and Chemist in Geological Survey of India.',
      },
      {
        title: 'UPSC Central Armed Police Forces (ACs) Examination 2025 Interview Schedule',
        sourceReference: 'UPSC-2025-CAPF-INT',
        officialUrl: 'https://upsc.gov.in/interview-details/capf-2025',
        pdfUrl: 'https://upsc.gov.in/sites/default/files/CAPF-2025-PT-Schedule.pdf',
        categorySlug: 'admit-cards',
        extractedDate: '2026-03-12',
        details: 'Personality Test interview dates released for BSF, CRPF, CISF, ITBP, SSB assistant commandants.',
      },
    ];
  }
}

export class SSCConnector implements SourceConnector {
  code = 'SSC';
  name = 'Staff Selection Commission';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    return [
      {
        title: 'SSC Selection Post Phase-XIII / 2026 Examination Notification',
        sourceReference: 'SSC-2026-PHASE-13',
        officialUrl: 'https://ssc.gov.in/notice-details/phase-13-2026',
        pdfUrl: 'https://ssc.gov.in/uploads/Notice_Phase_XIII_2026.pdf',
        categorySlug: 'latest-jobs',
        extractedDate: '2026-03-14',
        details: 'Matriculation, Higher Secondary and Graduation level posts across Central Government departments.',
      },
      {
        title: 'SSC Stenographer Grade C & D Examination 2025 Skill Test Result',
        sourceReference: 'SSC-2025-STENO-SKILL',
        officialUrl: 'https://ssc.gov.in/results/steno-2025-skill',
        pdfUrl: 'https://ssc.gov.in/uploads/Steno_2025_Skill_List.pdf',
        categorySlug: 'results',
        extractedDate: '2026-03-15',
        details: 'Roll-number wise list of candidates shortlisted for document verification.',
      },
    ];
  }
}

export class RailwaysConnector implements SourceConnector {
  code = 'RRB';
  name = 'Railway Recruitment Boards';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    return [
      {
        title: 'Railway RRB ALP (Assistant Loco Pilot) CEN 01/2026 Exam Schedule Out',
        sourceReference: 'RRB-2026-ALP-SCHED',
        officialUrl: 'https://indianrailways.gov.in/railwayboard/uploads/directorate/rrb/ALP_Schedule.pdf',
        pdfUrl: 'https://indianrailways.gov.in/rrb_alp_2026_notice.pdf',
        categorySlug: 'admit-cards',
        extractedDate: '2026-03-16',
        details: 'Computer Based Test (CBT-1) tentative dates published across 21 RRB zones.',
      },
    ];
  }
}

export class IBPSConnector implements SourceConnector {
  code = 'IBPS';
  name = 'Institute of Banking Personnel Selection';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    return [
      {
        title: 'IBPS Specialist Officers (SO CRP SPL-XV) Online Preliminary Score Card',
        sourceReference: 'IBPS-2026-SO-PRE-SCORE',
        officialUrl: 'https://ibpsonline.ibps.in/crpsoxvi/res',
        pdfUrl: 'https://www.ibps.in/wp-content/uploads/Notification_SO_XV.pdf',
        categorySlug: 'results',
        extractedDate: '2026-03-11',
        details: 'Score display for IT Officer, Agricultural Field Officer, Rajbhasha Adhikari, Law Officer.',
      },
    ];
  }
}

export class NTAConnector implements SourceConnector {
  code = 'NTA';
  name = 'National Testing Agency';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    return [
      {
        title: 'NTA CUET UG (Common University Entrance Test) 2026 Online Registration',
        sourceReference: 'NTA-2026-CUET-UG',
        officialUrl: 'https://cuetug.ntaonline.in',
        pdfUrl: 'https://exams.nta.ac.in/CUET-UG/Information_Bulletin_2026.pdf',
        categorySlug: 'admissions',
        extractedDate: '2026-03-08',
        details: 'Admission into Undergraduate Programs in Central and Participating Universities.',
      },
    ];
  }
}

export class UPSSSCConnector implements SourceConnector {
  code = 'UPSSSC';
  name = 'UP Subordinate Services Selection Commission';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    return [
      {
        title: 'UPSSSC VDO (Village Development Officer) Re-Exam 2026 Revised Answer Key',
        sourceReference: 'UPSSSC-2026-VDO-KEY',
        officialUrl: 'https://upsssc.gov.in/notice_vdo_key_2026',
        pdfUrl: 'https://upsssc.gov.in/uploads/VDO_Revised_Answer_Key.pdf',
        categorySlug: 'answer-keys',
        extractedDate: '2026-03-13',
        details: 'Revised objection disposal key for Gram Panchayat Adhikari recruitment.',
      },
    ];
  }
}

export class UPPSCConnector implements SourceConnector {
  code = 'UPPSC';
  name = 'UP Public Service Commission';

  async fetchUpdates(): Promise<RawNotificationItem[]> {
    return [
      {
        title: 'UPPSC Review Officer (RO) / Assistant Review Officer (ARO) Exam Date Notice',
        sourceReference: 'UPPSC-2026-RO-ARO-DATE',
        officialUrl: 'https://uppsc.up.nic.in/AllNotices.aspx',
        pdfUrl: 'https://uppsc.up.nic.in/Notice_RO_ARO_2026.pdf',
        categorySlug: 'admit-cards',
        extractedDate: '2026-03-09',
        details: 'Important notice regarding Samiksha Adhikari preliminary examination centers and guidelines.',
      },
    ];
  }
}

export const registeredConnectors: Record<string, SourceConnector> = {
  UPSC: new UPSCConnector(),
  SSC: new SSCConnector(),
  RRB: new RailwaysConnector(),
  IBPS: new IBPSConnector(),
  NTA: new NTAConnector(),
  UPSSSC: new UPSSSCConnector(),
  UPPSC: new UPPSCConnector(),
};
