const puppeteer = require("puppeteer");
const request = require("request");
var tough = require("tough-cookie");
const request_client = require("request-promise-native");
var Promise = require("bluebird");
var fs = require("fs");
function download(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", resolve);
    });
  });
}
(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    product: "firefox",
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  const result = [];
  //await setupRequestInterception(result, page);
  page.setViewport({ width: 1920, height: 2000 });
  console.log("2");
  await page.goto("https://www.fahrschule.de/Fragenkatalog/");

  //   let data = await page.$$eval(".imenu > li", (a) => {
  //     return a.map((a) => {
  //       return { link: a.getAttribute("onClick"), text: a.textContent };
  //     });
  //   });

  //   //formatis: window.location='/Fragenkatalog/2.2.02'
  //   //Getting the headlines and links to themes
  //   data = data
  //     .filter((e) => !!e.link)
  //     .map((e) => {
  //       return {
  //         ...e,
  //         number: e.link.match(/\d.\d.\d\d|\d.\d/)[0],
  //         text: e.text.replace(/(\r\n|\n|\r|\t|\d.\d.\d\d|\d.\d)/gm, ""),
  //         link: e.link.match(/'(.*)'/)[1],
  //       };
  //     });
  //   let count = 0;
  //   await fs.writeFile("data/metadata.json", JSON.stringify(data), "utf8", () =>
  //     console.log("done")
  //   );

  //console.log(data);
  let data = [
    //{ link: "/Fragenkatalog/1.1", text: "Gefahrenlehre", number: "1.1" },
    {
      link: "/Fragenkatalog/1.1.01",
      text: "Grundformen des Verkehrsverhaltens",
      number: "1.1.01",
    },
    {
      link: "/Fragenkatalog/1.1.02",
      text: "Verhalten gegenüber Fußgängern",
      number: "1.1.02",
    },
    {
      link: "/Fragenkatalog/1.1.03",
      text: "Fahrbahn- und Witterungsverhältnisse",
      number: "1.1.03",
    },
    {
      link: "/Fragenkatalog/1.1.04",
      text: "Dunkelheit und schlechte Sicht",
      number: "1.1.04",
    },
    {
      link: "/Fragenkatalog/1.1.05",
      text: "Geschwindigkeit",
      number: "1.1.05",
    },
    { link: "/Fragenkatalog/1.1.06", text: "Überholen", number: "1.1.06" },
    {
      link: "/Fragenkatalog/1.1.07",
      text: "Besondere Verkehrssituationen",
      number: "1.1.07",
    },
    {
      link: "/Fragenkatalog/1.1.09",
      text: "Alkohol, Drogen, Medikamente",
      number: "1.1.09",
    },
    // {
    //   link: "/Fragenkatalog/1.2",
    //   text: "Verhalten im Straßenverkehr",
    //   number: "1.2",
    // },
    {
      link: "/Fragenkatalog/1.2.01",
      text: "Grundregeln über das Verhalten im Straßenverkehr",
      number: "1.2.01",
    },
    {
      link: "/Fragenkatalog/1.2.02",
      text: "Straßenbenutzung",
      number: "1.2.02",
    },
    {
      link: "/Fragenkatalog/1.2.03",
      text: "Geschwindigkeit",
      number: "1.2.03",
    },
    { link: "/Fragenkatalog/1.2.04", text: "Abstand", number: "1.2.04" },
    { link: "/Fragenkatalog/1.2.05", text: "Überholen", number: "1.2.05" },
    {
      link: "/Fragenkatalog/1.2.06",
      text: "Vorbeifahren",
      number: "1.2.06",
    },
    {
      link: "/Fragenkatalog/1.2.07",
      text: "Benutzung von Fahrstreifen durch Kraftfahrzeuge",
      number: "1.2.07",
    },
    {
      link: "/Fragenkatalog/1.2.09",
      text: "Abbiegen, Wenden und Rückwärtsfahren",
      number: "1.2.09",
    },
    {
      link: "/Fragenkatalog/1.2.10",
      text: "Einfahren und Anfahren",
      number: "1.2.10",
    },
    {
      link: "/Fragenkatalog/1.2.11",
      text: "Besondere Verkehrslagen",
      number: "1.2.11",
    },
    {
      link: "/Fragenkatalog/1.2.12",
      text: "Halten und Parken",
      number: "1.2.12",
    },
    {
      link: "/Fragenkatalog/1.2.16",
      text: "Warnzeichen",
      number: "1.2.16",
    },
    {
      link: "/Fragenkatalog/1.2.17",
      text: "Beleuchtung",
      number: "1.2.17",
    },
    {
      link: "/Fragenkatalog/1.2.19",
      text: "Bahnübergänge",
      number: "1.2.19",
    },
    {
      link: "/Fragenkatalog/1.2.20",
      text: "Öffentliche Verkehrsmittel und Schulbusse",
      number: "1.2.20",
    },
    { link: "/Fragenkatalog/1.2.22", text: "Ladung", number: "1.2.22" },
    {
      link: "/Fragenkatalog/1.2.23",
      text: "Sonstige Pflichten des Fahrzeugführers",
      number: "1.2.23",
    },
    {
      link: "/Fragenkatalog/1.2.26",
      text: "Verhalten an Fußgängerüberwegen und gegenüber Fußgängern",
      number: "1.2.26",
    },
    { link: "/Fragenkatalog/1.2.34", text: "Unfall", number: "1.2.34" },
    {
      link: "/Fragenkatalog/1.2.36",
      text: "Zeichen und Weisungen der Polizeibeamten",
      number: "1.2.36",
    },
    {
      link: "/Fragenkatalog/1.2.37",
      text: "Wechsellichtzeichen und Dauerlichtzeichen",
      number: "1.2.37",
    },
    {
      link: "/Fragenkatalog/1.2.38",
      text: "Blaues Blinklicht und gelbes Blinklicht",
      number: "1.2.38",
    },
    // {
    //   link: "/Fragenkatalog/1.3",
    //   text: "Vorfahrt, Vorrang",
    //   number: "1.3",
    // },
    {
      link: "/Fragenkatalog/1.3.01",
      text: "Vorfahrt, Vorrang",
      number: "1.3.01",
    },
    //{ link: "/Fragenkatalog/1.4", text: "Verkehrszeichen", number: "1.4" },
    {
      link: "/Fragenkatalog/1.4.40",
      text: "Gefahrzeichen",
      number: "1.4.40",
    },
    {
      link: "/Fragenkatalog/1.4.41",
      text: "Vorschriftzeichen",
      number: "1.4.41",
    },
    {
      link: "/Fragenkatalog/1.4.42",
      text: "Richtzeichen",
      number: "1.4.42",
    },
    {
      link: "/Fragenkatalog/1.4.43",
      text: "Verkehrseinrichtungen",
      number: "1.4.43",
    },
    //{ link: "/Fragenkatalog/1.5", text: "Umweltschutz", number: "1.5" },
    {
      link: "/Fragenkatalog/1.5.01",
      text: "Umweltschutz",
      number: "1.5.01",
    },
    //{ link: "/Fragenkatalog/1.7", text: "Technik", number: "1.7" },
    {
      link: "/Fragenkatalog/1.7.01",
      text: "Fahrbetrieb, Fahrphysik, Fahrtechnik",
      number: "1.7.01",
    },
    // {
    //   link: "/Fragenkatalog/1.8",
    //   text: "Eignung und Befähigung von Kraftfahrern",
    //   number: "1.8",
    // },
    {
      link: "/Fragenkatalog/1.8.01",
      text: "Eignung und Befähigung von Kraftfahrern",
      number: "1.8.01",
    },
    //{ link: "/Fragenkatalog/2.1", text: "Gefahrenlehre", number: "2.1" },
    {
      link: "/Fragenkatalog/2.1.01",
      text: "Grundformen des Verkehrsverhaltens",
      number: "2.1.01",
    },
    {
      link: "/Fragenkatalog/2.1.02",
      text: "Verhalten gegenüber Fußgängern",
      number: "2.1.02",
    },
    {
      link: "/Fragenkatalog/2.1.03",
      text: "Fahrbahn- und Witterungsverhältnisse",
      number: "2.1.03",
    },
    {
      link: "/Fragenkatalog/2.1.04",
      text: "Dunkelheit und schlechte Sicht",
      number: "2.1.04",
    },
    {
      link: "/Fragenkatalog/2.1.05",
      text: "Geschwindigkeit",
      number: "2.1.05",
    },
    { link: "/Fragenkatalog/2.1.06", text: "Überholen", number: "2.1.06" },
    {
      link: "/Fragenkatalog/2.1.07",
      text: "Besondere Verkehrssituationen",
      number: "2.1.07",
    },
    { link: "/Fragenkatalog/2.1.08", text: "Autobahn", number: "2.1.08" },
    {
      link: "/Fragenkatalog/2.1.09",
      text: "Alkohol, Drogen, Medikamente",
      number: "2.1.09",
    },
    {
      link: "/Fragenkatalog/2.1.10",
      text: "Ermüdung, Ablenkung",
      number: "2.1.10",
    },
    {
      link: "/Fragenkatalog/2.1.11",
      text: "Affektiv-emotionales Verhalten im Straßenverkehr",
      number: "2.1.11",
    },
    // {
    //   link: "/Fragenkatalog/2.2",
    //   text: "Verhalten im Straßenverkehr",
    //   number: "2.2",
    // },
    {
      link: "/Fragenkatalog/2.2.02",
      text: "Straßenbenutzung",
      number: "2.2.02",
    },
    {
      link: "/Fragenkatalog/2.2.03",
      text: "Geschwindigkeit",
      number: "2.2.03",
    },
    { link: "/Fragenkatalog/2.2.04", text: "Abstand", number: "2.2.04" },
    { link: "/Fragenkatalog/2.2.05", text: "Überholen", number: "2.2.05" },
    {
      link: "/Fragenkatalog/2.2.07",
      text: "Benutzung von Fahrstreifen durch Kraftfahrzeuge",
      number: "2.2.07",
    },
    {
      link: "/Fragenkatalog/2.2.09",
      text: "Abbiegen, Wenden und Rückwärtsfahren",
      number: "2.2.09",
    },
    {
      link: "/Fragenkatalog/2.2.12",
      text: "Halten und Parken",
      number: "2.2.12",
    },
    {
      link: "/Fragenkatalog/2.2.13",
      text: "Einrichtungen zur Überwachung der Parkzeit",
      number: "2.2.13",
    },
    {
      link: "/Fragenkatalog/2.2.14",
      text: "Sorgfaltspflichten",
      number: "2.2.14",
    },
    {
      link: "/Fragenkatalog/2.2.15",
      text: "Liegenbleiben und Abschleppen von Fahrzeugen",
      number: "2.2.15",
    },
    {
      link: "/Fragenkatalog/2.2.16",
      text: "Warnzeichen",
      number: "2.2.16",
    },
    {
      link: "/Fragenkatalog/2.2.17",
      text: "Beleuchtung",
      number: "2.2.17",
    },
    {
      link: "/Fragenkatalog/2.2.18",
      text: "Autobahnen und Kraftfahrstraßen",
      number: "2.2.18",
    },
    // {
    //   link: "/Fragenkatalog/2.2.19",
    //   text: "Bahnübergänge",
    //   number: "2.2.19",
    // },
  ];
  //Getting the themes and links to questions
  data = await Promise.map(
    data,
    async (e) => {
      console.log(e);
      if (!e.number.match(/\d.\d.\d\d/)) {
        return { text: e.text, header: true };
      }
      const url = "https://www.fahrschule.de" + e.link;
      //console.log(count++);
      await delay(400);
      await page.goto(url);
      let questions = await page.$$eval(".imenu > li", (a) => {
        return a.map((a) => {
          return { link: a.getAttribute("onClick"), text: a.textContent };
        });
      });
      //console.log(questions);
      questions = questions
        .filter((e) => !!e.link)
        .map((e) => {
          const num = e.link.match(/(\d.\d.\d\d-\d\d\d|\d.\d.\d\d-\d\d\d-\w)/);
          const text = e.text;
          return {
            ...e,
            number: num ? num[0] : "",
            text: text
              ? e.text.replace(
                  /(\d.\d.\d\d-\d\d\d-\w|\r\n|\n|\r|\t|\d.\d.\d\d-\d\d\d)/gm,
                  ""
                )
              : "",
            link: e.link.match(/'(.*)'/)[1],
          };
        });
      console.log(questions);
      questions = await Promise.map(
        questions,
        async (q) => {
          const url2 = "https://www.fahrschule.de" + q.link;

          await page.goto(url2, { waitUntil: "load" });
          //sawait autoScroll(page);
          //   const z = await page.$eval("#picture", (e) => {
          //     e.scrollIntoView({
          //       behavior: "smooth",
          //       block: "end",
          //       inline: "end",
          //     });
          //     return e;
          //   });
          //   console.log(z + "----------------------");
          //   await delay(5000);
          const isVideo = await page.$eval(
            ".showVideo",
            (e) => e.style.display !== "none"
          );
          const isImage = await page.$eval(
            "#picture",
            (e) => e.style.display !== "none"
          );
          let medialink = "";
          if (isVideo) {
            await page.click(".showVideo");
            await page.waitForSelector("video");
            await delay(1000);
            let videoHref = await page.$$eval("video", (a) => {
              return a.map((a) => {
                return a.getAttribute("src");
              });
            });
            console.log(videoHref);
            if (videoHref[0]) {
              download(videoHref[0], "data/videos/" + q.number + ".mp4");
              medialink = videoHref[0];
            }
            await page.click(".topleft");
            await delay(1000);
            await page.click(".showQuestion");
            console.log("done");
          }
          if (isImage) {
            let imgHref = await page.$$eval("#picture", (a) => {
              return a.map((a) => {
                return a.getAttribute("href");
              });
            });
            console.log(imgHref);
            if (imgHref[0]) {
              download(imgHref[0], "data/pictures/" + q.number + ".png");
              medialink = imgHref[0];
            }
          }
          await page.waitForSelector(".antwort");

          await page.click(".antwort");
          await delay(500);
          let data2 = await page.$$eval("#answers", (a) => {
            return a.map((a) => {
              let answers = { incorrectAnswers: [], correctAnswers: [] };
              a.querySelectorAll("li.wrongOff span").forEach((e, i) => {
                answers.correctAnswers.push(e.textContent);
              });
              a.querySelectorAll("li.correctOff span").forEach((e, i) => {
                answers.incorrectAnswers.push(e.textContent);
              });
              return answers;
            });
          });
          console.log({
            ...q,
            type: isImage ? "image" : isVideo ? "video" : "simple",
            medialink: medialink,
            ...data2[0],
          });

          return {
            ...q,
            type: isImage ? "image" : isVideo ? "video" : "simple",
            medialink: medialink,
            ...data2[0],
          };
        },
        { concurrency: 1 }
      );
      await fs.writeFile(
        "data/" + e.number + ".json",
        JSON.stringify({ ...e, questions: questions }),
        "utf8",
        () => console.log("done")
      );
      //   await fs.writeFile(
      //     "data/requests" + e.number + "requests.json",
      //     JSON.stringify(result),
      //     "utf8",
      //     () => console.log("done")
      //   );
      while (result[0]) {
        result.pop();
      }
      console.log({ ...e, questions: questions });
      return { ...e, questions: questions };
    },
    { concurrency: 1 }
  );

  await browser.close();
  await fs.writeFile("data.json", JSON.stringify(data), "utf8", () =>
    console.log("done")
  );
  console.log(data);
  //   await fs.writeFile("myjsonfile.json", JSON.stringify(result), "utf8", () =>
  //     console.log("done")
  //   );

  fs.readFile("myjsonfile.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const user = JSON.parse(data);
  });
  //console.log(JSON.parse(result[0]).QuestionObject);
})();
const intercept = async (result, page) => {
  let paused = false;
  let pausedRequests = [];

  const nextRequest = () => {
    // continue the next request or "unpause"
    if (pausedRequests.length === 0) {
      paused = false;
    } else {
      // continue first request in "queue"
      pausedRequests.shift()(); // calls the request.continue function
    }
  };

  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (paused) {
      pausedRequests.push(() => request.continue());
    } else {
      paused = true; // pause, as we are processing a request now
      request.continue();
    }
  });

  page.on("requestfinished", async (request) => {
    const response = await request.response();

    const responseHeaders = response.headers();
    let responseBody;
    if (request.redirectChain().length === 0) {
      // body can only be access for non-redirect responses
      responseBody = await response.buffer();
    }

    const information = {
      url: request.url(),
      //   requestHeaders: request.headers(),
      //   requestPostData: request.postData(),
      //   responseHeaders: responseHeaders,
      //   responseSize: responseHeaders["content-length"],
      responseBody,
    };
    if (request.url().match(/oQuestion/)) {
      console.log(information);
      results.push(information);
    }

    nextRequest(); // continue with next request
  });
  page.on("requestfailed", (request) => {
    // handle failed request
    nextRequest();
  });
};
const setupRequestInterception = async (result, page) => {
  await page.setRequestInterception(true);
  let cookie1 = new tough.Cookie({
    key: "ASPSESSIONIDQEQCQTCQ",
    value: "JABBFJLBFFDJAPPHMGCDBHKO",
    //httpOnly: true,
    maxAge: 31536000,
  });
  let cookie2 = new tough.Cookie({
    key: "ASPSESSIONIDQETARTDQ",
    value: "NENFDFICIACPHHDNGFBEHIPE",
    maxAge: 31536000,
  });
  const cookiejar = request_client.jar();
  cookiejar.setCookie(cookie1.toString(), "https://www.fahrschule.de/");
  cookiejar.setCookie(cookie2.toString(), "https://www.fahrschule.de/");
  page.on("request", (request) => {
    request_client({
      uri: request.url(),
      resolveWithFullResponse: true,
      jar: cookiejar,
    })
      .then((response) => {
        const response_body = response.body;
        if (request.url().match(/oQuestion/)) {
          //console.log(response_body);
          result.push(response_body);
        }
        request.continue();
      })
      .catch((error) => {
        request.abort();
      });
  });
};
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(
      () => document.body.innerHTML.length
    );

    console.log(
      "last: ",
      lastHTMLSize,
      " <> curr: ",
      currentHTMLSize,
      " body html size: ",
      bodyHTMLSize
    );

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }
};
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 400;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
