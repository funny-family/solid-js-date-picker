var fetchInputElementPage = async () => {
  var result = {
    error: null,
    response: null,
  };

  try {
    var response = await fetch(
      'https://html.spec.whatwg.org/#the-input-element'
    );

    result.response = response;

    return result;
  } catch (error) {
    result.error = error;

    return result;
  }
};

import jsdom from 'jsdom';
import HtmlTableToJson from 'html-table-to-json';

var data = await fetchInputElementPage();
var pageText = await data.response.text();

var dom = new jsdom.JSDOM(pageText);
var domDocument = dom.window.document;

var htmlTable = domDocument.getElementById('input-type-attr-summary');

htmlTable.childNodes.forEach((node, index) => {
  console.log(node, index);
});

// import { tabletojson } from 'tabletojson';

// tabletojson.convertUrl(
//   'https://html.spec.whatwg.org/#the-input-element',
//   (tablesAsJson) => {
//     console.log(tablesAsJson[41]);
//   }
// );
