import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../colors';

const HelpSupportScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Help and Support</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Getting Started</Text>
          <Text style={styles.paragraph}>
            Here, provide a step-by-step guide on how to get started with your app. Explain the key features, how to navigate, and where to find essential functionalities.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>FAQs (Frequently Asked Questions)</Text>
          <Text style={styles.paragraph}>
            Compile a list of common queries users might have. This could include issues with account setup, payments, or any other frequent concerns. Answer these questions clearly and concisely.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Contact Support</Text>
          <Text style={styles.paragraph}>
            Encourage users to reach out for further assistance. Provide contact details or a form where they can submit their queries or report issues. This could include an email address, a support hotline, or a dedicated in-app chat support feature.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.lightGray,
    paddingVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  section: {
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkGray,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
  },
});

export default HelpSupportScreen;
