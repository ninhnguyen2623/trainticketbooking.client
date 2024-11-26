import ProfileForm from "./ProfileForm";
import ContentSection from "../components/ContentSection";

export default function SettingsProfile() {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <ProfileForm />
    </ContentSection>
  );
}
