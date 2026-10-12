import Image from "next/image";

type Props = { name: string; role?: string; avatar?: string };

export function AuthorCard({ name, role, avatar }: Props) {
  return (
    <div className="flex items-center gap-3">
      {avatar ? (
        <Image src={avatar} alt="" width={48} height={48} className="size-12 shrink-0 border-[3px] border-ink object-cover" />
      ) : (
        <div className="flex size-12 shrink-0 items-center justify-center border-[3px] border-ink bg-spark font-extrabold text-on-spark">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div>
        <p className="font-bold leading-tight">{name}</p>
        {role && <p className="font-mono text-xs">{role}</p>}
      </div>
    </div>
  );
}