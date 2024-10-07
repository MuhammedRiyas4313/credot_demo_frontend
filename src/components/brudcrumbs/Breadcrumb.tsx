function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="hidden md:flex h-[156px] w-full bg-[#F9F9F9] justify-center items-center">
      <p className="font-semibold text-[24px] leading-[52.33px] tracking-[0.56px]">
        {title}
      </p>
    </div>
  );
}

export default Breadcrumb;
