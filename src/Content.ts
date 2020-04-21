import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");

        res.write("<title>LNKO</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        res.write("Legnagyobb közös osztó meghatározása\n\n");

        res.write("\nKivonásos módszerrel\n");

        let a: number = parseInt(params.A as string);
        if (isNaN(a)) a = 5;

        res.write(`a= <input type='number' name='A' value=${a} style='max-width:100px;' onChange='this.form.submit();'>\n`);

        let b: number = parseInt(params.B as string);
        if (isNaN(b)) b = 5;

        res.write(`b= <input type='number' name='B' value=${b} style='max-width:100px;' onChange='this.form.submit();'>\n`);

        let segeda: number = a;
        let segedb: number = b;

        while (segeda != segedb) {
            if (segeda > segedb) {
                segeda = segeda - segedb;
            } else {
                segedb = segedb - segeda;
            }
        }
        res.write(`${a} és ${b} legnagyobb közös osztója: ${segeda}\n`);

        res.write("\nEuklidész-módszerrel\n");
        segeda = a;
        segedb = b;
        let marad: number;
        do {
            marad = segeda % segedb;
            segeda = segedb;
            segedb = marad;
        } while (marad != 0);
        res.write(`\n${a} és ${b} legnagyobb közös osztója: ${segeda}\n`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");

        res.write("</body></html>");
        res.end();
    }
}
