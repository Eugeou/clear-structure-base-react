import React, { type ComponentType, type LazyExoticComponent } from "react";

export type PreloadableComponent<T extends ComponentType<any>> =
  LazyExoticComponent<T> & {
    preload: () => Promise<void>;
  };

function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  const Component: Partial<PreloadableComponent<T>> = React.lazy(factory);

  Component.preload = async () => {
    await factory();
  };

  return Component as PreloadableComponent<T>;
}

export default lazyWithPreload;
