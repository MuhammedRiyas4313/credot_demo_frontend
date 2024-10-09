function SectionTitle({
  title,
  titleOnMobile,
}: {
  title: string;
  titleOnMobile: string;
}) {
  return (
    <div className="border-b border-[#EEEEEE] mb-0 md:mb-12 md:pb-6">
      <h2 className="font-semibold text-[32px] leading-[48.96px] hidden md:block">
        {title}
      </h2>
      <h2 className="font-semibold text-[16px] leading-[48.96px] md:hidden align-baseline">
        {titleOnMobile}
      </h2>
    </div>
  );
}

export default SectionTitle;
