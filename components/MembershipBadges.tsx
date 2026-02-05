import Image from "next/image";

const badges = [
    {
        name: "Forbes BLK Global Community",
        logo: "/badges/forbes-blk.png",
        description: "Distinguished Member"
    },
    {
        name: "TEDx Speaker",
        logo: "/badges/tedx.png",
        description: "Official Speaker"
    },
    {
        name: "Real Estate Excellence",
        logo: "/badges/real-estate-award.png",
        description: "Award Winner"
    }
];

export default function MembershipBadges() {
    return (
        <div className="bg-[var(--color-mba-surface)] p-8 border border-[var(--color-mba-border)]">
            <h3 className="text-2xl font-bold text-black mb-8 text-center">
                Memberships & Recognition
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 text-center border border-[var(--color-mba-border)] hover:border-[var(--color-mba-blue)] transition-smooth group"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div className="w-full h-full bg-gradient-to-br from-[var(--color-mba-blue)] to-[var(--color-mba-blue-hover)] opacity-10 rounded-full" />
                        </div>
                        <h4 className="text-base font-bold text-black mb-2">{badge.name}</h4>
                        <p className="text-sm text-[#333333]">{badge.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
