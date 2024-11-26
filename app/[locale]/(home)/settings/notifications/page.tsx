import { NotificationsForm } from "./NotificationsForm";
import ContentSection from "../components/ContentSection";

export default function SettingsNotifications() {
  return (
    <ContentSection
      title="Notifications"
      desc="Configure how you receive notifications."
    >
      <NotificationsForm />
    </ContentSection>
  );
}
