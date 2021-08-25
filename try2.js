//const puppeteer = require("puppeteer-extra");
const puppeteer = require("puppeteer");
const request = require("request");
var tough = require("tough-cookie");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

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
  // const stealth = StealthPlugin();
  // // Remove this specific stealth plugin from the default set
  // stealth.enabledEvasions.delete("user-agent-override");
  // puppeteer.use(stealth);
  // const UserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
  // // Define custom UA, locale and platform
  // const ua = UserAgentOverride({
  //   userAgent:
  //     "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
  //   locale: "de-DE,de;q=0.9",
  //   platform: "Linux x86_x64",
  // });
  // puppeteer.use(ua);

  // const args = [
  //   "--no-sandbox",
  //   "--disable-setuid-sandbox",
  //   "--disable-infobars",
  //   "--window-position=0,0",
  //   "--ignore-certifcate-errors",
  //   "--ignore-certifcate-errors-spki-list",
  //   '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
  // ];

  // const options = {
  //   args,
  //   headless: false,
  //   ignoreHTTPSErrors: true,
  //   userDataDir: "./tmp",
  // };
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    product: "firefox",
  });
  // console.log("Running tests..");
  // const page = await browser.newPage();
  // await page.goto("https://bot.sannysoft.com");
  // await page.waitForTimeout(5000);
  // await page.screenshot({ path: "testresult.png", fullPage: true });
  // await browser.close();
  // console.log(`All done, check the screenshot. ✨`);
  // return;

  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  const result = [];
  //await setupRequestInterception(result, page);
  page.setViewport({ width: 1920, height: 1080 });

  // await page.evaluateOnNewDocument(() => {
  //   Object.defineProperty(navigator, "platform", {
  //     get: () => "Linux x86_x64",
  //   });
  //   Object.defineProperty(navigator, "productSub", { get: () => "20100101" });
  //   Object.defineProperty(navigator, "vendor", { get: () => "" });
  //   Object.defineProperty(navigator, "oscpu", { get: () => "Linux x86_64" });
  //   Object.defineProperty(navigator, "cpuClass", { get: () => undefined });
  //   Object.defineProperty(navigator, "webdriver", { get: () => false });
  // });
  // await page.setUserAgent(
  //   "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0"
  // );
  // await page.goto("https://i-know-you-faked-user-agent.glitch.me/");
  // await delay(999999999999);
  const all = [
    "https://www.fahrschule.de/Fragenkatalog/1.1.07-123", //simple
    "https://www.fahrschule.de/Fragenkatalog/1.1.07-138", //image
    "https://www.fahrschule.de/Fragenkatalog/1.2.04-102", //video
  ];
  const scraped = await Promise.map(
    all,
    async (link) => {
      await page.goto(link);
      console.log("LL");
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
          download(videoHref[0], "trset.mp4");
          medialink = videoHref[0];
        }

        // await page.evaluate(() => {
        //   const allDivs = document.querySelectorAll("*");
        //   const randomElement =
        //     allDivs[Math.floor(Math.random() * allDivs.length)];
        //   randomElement.click();
        // });
        await page.click(".topleft");
        //await page.click(".showQuestion");
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
          download(imgHref[0], "trst.png");
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
      return {
        type: isImage ? "image" : isVideo ? "video" : "simple",
        medialink: medialink,
        ...data2[0],
      };
    },
    { concurrency: 1 }
  );
  console.log(scraped[0]);

  console.log(scraped[1]);

  console.log(scraped[2]);
  return;
  await page.goto("https://www.fahrschule.de/Fragenkatalog/1.2.04-102");

  console.log(await page.click(".showVideo"));
  await page.waitForSelector("video");
  await delay(5000);

  let videoHref = await page.$$eval("video", (a) => {
    return a.map((a) => {
      return a.getAttribute("src");
    });
  });
  console.log(videoHref);
  if (videoHref[0]) {
    download(videoHref[0], "trset.mp4");
  }

  await delay(3000);
  let imgHref = await page.$$eval("#picture", (a) => {
    return a.map((a) => {
      return a.getAttribute("href");
    });
  });
  console.log(imgHref);
  if (imgHref[0]) {
    download(imgHref[0], "trst.png");
  }

  return;

  let data = await page.$$eval(".imenu > li", (a) => {
    return a.map((a) => {
      return { link: a.getAttribute("onClick"), text: a.textContent };
    });
  });

  //formatis: window.location='/Fragenkatalog/2.2.02'
  //Getting the headlines and links to themes
  data = data
    .filter((e) => !!e.link)
    .map((e) => {
      return {
        ...e,
        number: e.link.match(/\d.\d.\d\d|\d.\d/)[0],
        text: e.text.replace(/(\r\n|\n|\r|\t|\d.\d.\d\d|\d.\d)/gm, ""),
        link: e.link.match(/'(.*)'/)[1],
      };
    });
  let count = 0;
  await fs.writeFile("data/metadata.json", JSON.stringify(data), "utf8", () =>
    console.log("done")
  );
  console.log(data);

  //Getting the themes and links to questions
  data = await Promise.map(
    [data[0]],
    async (e) => {
      if (!e.number.match(/\d.\d.\d\d/)) {
        return { text: e.text, header: true };
      }
      const url = "https://www.fahrschule.de" + e.link;
      console.log(count++);
      await delay(400);
      await page.goto(url);
      let questions = await page.$$eval(".imenu > li", (a) => {
        return a.map((a) => {
          return { link: a.getAttribute("onClick"), text: a.textContent };
        });
      });
      questions = [questions[1]]
        .filter((e) => !!e.link)
        .map((e) => {
          const num = e.link.match(/(\d.\d.\d\d-\d\d\d|\d.\d.\d\d-\d\d\d-\w)/);
          return {
            ...e,
            number: num ? num[0] : false,
            text: e.text.replace(
              /(\d.\d.\d\d-\d\d\d-\w|\r\n|\n|\r|\t|\d.\d.\d\d-\d\d\d)/gm,
              ""
            ),
            link: e.link.match(/'(.*)'/)[1],
          };
        });
      questions = await Promise.map(
        questions,
        async (q) => {
          const url2 = "https://www.fahrschule.de" + q.link;

          await page.goto(url2, { waitUntil: "load" });
          await delay(1000);
          await page.click(".antwort");
          //   await page.$$eval(".antwort", (a) => {
          //     return a.map(async (a) => {
          //       await a.click();
          //     });
          //   });
          await delay(500);
          //await waitTillHTMLRendered(page);
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
          console.log({ ...q, answers: data2 });

          return { ...q, answers: data2 };
        },
        { concurrency: 1 }
      );
      await fs.writeFile(
        "data/" + e.number + ".json",
        JSON.stringify({ ...e, questions: questions }),
        "utf8",
        () => console.log("done")
      );
      await fs.writeFile(
        "data/" + e.number + "requests.json",
        JSON.stringify(result),
        "utf8",
        () => console.log("done")
      );
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
