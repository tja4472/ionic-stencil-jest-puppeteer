import { TestWindow } from '@stencil/core/testing';
import { AppProfile } from './app-profile';

describe('app-profile', () => {
  it('should build', () => {
    expect(new AppProfile()).toBeTruthy();
  });

  it('should be the new way', async () => {
    const window = new TestWindow();
    const element = await window.load({
      components: [AppProfile],
      html: '<app-profile></app-profile>'
    });
    expect(element.textContent).toEqual('Ionic PWA ToolkitHello! My name is . My name was passed in through a route param!');
  
    element.name = 'George';
    await window.flush();
  
    expect(element.textContent).toEqual('Ionic PWA ToolkitHello! My name is George. My name was passed in through a route param!');
  });

/*  
  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [AppProfile],
        html: '<app-profile></app-profile>'
      });
    });

    it('should not render any content if there is not a match', async () => {
      await flush(element);
      expect(element.textContent).toEqual('');
    })

    it('should work with a name passed', async () => {
      element.match = {
        params: {
          name: 'stencil'
        }
      }
      
      await flush(element);

      const pElement = element.querySelector('ion-content p');

      expect(pElement.textContent).toEqual('Hello! My name is stencil. My name was passed in through a route param!');
    });
  });
*/  
});