/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_en from 'src/dictionary/en/common.json';
import common_lt from 'src/dictionary/lt/common.json';

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypename?: any;
  defaultOptions?: any;
  cache?: any;
  resolvers?: any;
  [st: string]: any;
};

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('LANGUAGE')
    ? localStorage?.getItem('LANGUAGE')?.toString()
    : 'en',
  resources: {
    en: {
      common: common_en,
    },
    lt: {
      common: common_lt,
    },
  },
});

const renderApollo = (
  node: any,
  {
    mocks,
    addTypename,
    defaultOptions,
    cache,
    resolvers,
    ...options
  }: RenderApolloOptions = {}
): RenderResult => {
  return render(
    <I18nextProvider i18n={i18next}>
      <MockedProvider
        mocks={mocks}
        addTypename={addTypename}
        defaultOptions={defaultOptions}
        cache={cache}
        resolvers={resolvers}
      >
        {node}
      </MockedProvider>
    </I18nextProvider>,
    options
  );
};

type TestWrapperProps = {
  children: React.ReactNode;
};

const TestWrapper = (props: TestWrapperProps): React.ReactElement => (
  <BrowserRouter>{props.children}</BrowserRouter>
);

export * from '@testing-library/react';
export { renderApollo, TestWrapper };
