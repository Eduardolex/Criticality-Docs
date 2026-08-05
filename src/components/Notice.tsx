const allowedStatuses = ['draft', 'approved', 'outdated'] as const;

type ReviewStatus = (typeof allowedStatuses)[number];

type ReviewNoticeProps = {
  status: ReviewStatus;
  owner?: string;
};

export default function ReviewNotice({
  status,
  owner = 'Unassigned',
}: ReviewNoticeProps) {
  if (!allowedStatuses.includes(status)) {
    throw new Error(`Invalid review status: ${status}`);
  }

  return (
    <aside>
      Status: {status} — Owner: {owner}
    </aside>
  );
}