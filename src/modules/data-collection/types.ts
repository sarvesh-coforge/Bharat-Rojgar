export interface RawNotificationItem {
  title: string;
  sourceReference: string;
  officialUrl: string;
  pdfUrl?: string;
  categorySlug: 'latest-jobs' | 'results' | 'admit-cards' | 'answer-keys' | 'syllabus' | 'admissions' | 'scholarships';
  extractedDate?: string;
  details?: string;
}

export interface SyncResult {
  sourceCode: string;
  status: 'SUCCESS' | 'ERROR' | 'PARTIAL';
  itemsFound: number;
  itemsNew: number;
  errorMessage?: string;
  details?: string;
}
