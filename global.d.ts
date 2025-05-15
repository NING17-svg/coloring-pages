// 为next-intl定义类型声明
type Messages = typeof import('./messages/en.json');

declare interface IntlMessages extends Messages {
  coloringPages: {
    title: string;
    subtitle: string;
    categories: {
      butterfly: {
        name: string;
        description: string;
      };
      flower: {
        name: string;
        description: string;
      };
      dragon: {
        name: string;
        description: string;
      };
      unicorn: {
        name: string;
        description: string;
      };
      viewAll: string;
      pageSuffix: string;
      pageSuffixSingular: string;
    };
    about: {
      title: string;
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
  };
  about: {
    title: string;
    intro: string;
    mission: {
      title: string;
      description: string;
    };
    howItWorks: {
      title: string;
      description: string;
      browse: string;
      browseDescription: string;
      create: string;
      createDescription: string;
    };
    technology: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
  };
}