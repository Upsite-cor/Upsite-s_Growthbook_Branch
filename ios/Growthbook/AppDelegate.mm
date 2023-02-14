#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h>
#import <React/RCTLinkingManager.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
  [FIRApp configure];
  self.moduleName = @"Growthbook";
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                      didFinishLaunchingWithOptions:launchOptions];
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
      return YES;
    }
  
  if([RNGoogleSignin application:app openURL:url options:options]){
      return YES;
    }

    if ([RCTLinkingManager application:app openURL:url options:options]) {
      return YES;
    }

    return NO;
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
