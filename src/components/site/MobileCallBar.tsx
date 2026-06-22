import { Phone, MessageCircle } from "lucide-react";
import { CONTACT, useI18n } from "@/lib/i18n";

export function MobileCallBar() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[oklch(0.06_0.02_260_/_0.92)] backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-2 gap-px bg-white/10">
        <a
          href={`tel:${CONTACT.phoneHref}`}
          className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold text-[oklch(0.10_0.03_260)] active:bg-white/90"
        >
          <Phone className="h-4 w-4" />
          {t("cta.call")}
        </a>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white active:bg-[#1DA851]"
        >
          <MessageCircle className="h-4 w-4" />
          {t("cta.whatsapp")}
        </a>
      </div>
    </div>
  );
}