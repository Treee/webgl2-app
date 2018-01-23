import { Webgl2AppPage } from './app.po';

describe('webgl2-app App', () => {
  let page: Webgl2AppPage;

  beforeEach(() => {
    page = new Webgl2AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
