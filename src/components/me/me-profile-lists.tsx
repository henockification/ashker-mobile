import { View } from 'react-native';

import { AccountSection } from './account-section';
import { CommunitySection } from './community-section';
import { ContributionsSection } from './contributions-section';
import { MeSectionSpacer } from './me-section-spacer';
import { YourActivitySection } from './your-activity-section';

export function MeProfileLists() {
  return (
    <View className="mt-8">
      <MeSectionSpacer />
      <ContributionsSection />
      <MeSectionSpacer />
      <CommunitySection />
      <MeSectionSpacer />
      <YourActivitySection />
      <MeSectionSpacer />
      <AccountSection />
    </View>
  );
}
