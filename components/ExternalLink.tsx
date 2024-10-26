import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform } from 'react-native';

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  // Add type checking for href
  if (typeof props.href !== 'string') {
    console.warn('ExternalLink: href prop must be a string');
    return null;
  }

  return (
    <Link
      target="_blank"
      {...props}
      href={props.href}
      onPress={async (e) => {
        if (Platform.OS !== 'web') {
          e.preventDefault();
          try {
            await WebBrowser.openBrowserAsync(props.href);
          } catch (error) {
            console.error('Failed to open external link:', error);
          }
        }
      }}
    />
  );
}
