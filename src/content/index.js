import model from "url:../model/model.onnx";
import {env, InferenceSession, Tensor} from "onnxruntime-web";
import browser from "webextension-polyfill";
// noinspection ES6UnusedImports
import {STUB} from "./wasm_stub";

const captchaInput = document.getElementById("captcha");
const captchaImg = document.getElementById("captcha-img");

const width = 110;
const height = 40;

function cvtBinary(data, threshold) {
    let binPic = new Float32Array(data.length / 4);
    for (let i = 0; i < binPic.length; i++) {
        const luma = data[i * 4] * 299 / 1000 + data[i * 4 + 1] * 587 / 1000 + data[i * 4 + 2] * 114 / 1000;
        binPic[i] = ((luma < threshold) ? 0 : 1);
    }
    return binPic;
}

async function predict() {
    // load model
    if (typeof this.session === "undefined") {
        env.wasm.wasmPaths = browser.runtime.getURL("");
        this.session = await InferenceSession.create(
            model,
            {
                executionProviders: ["wasm"],
            }
        );
    }

    // load image
    const cvs = document.createElement("canvas");
    cvs.setAttribute("width", width);
    cvs.setAttribute("height", height);
    const ctx = cvs.getContext("2d");
    ctx.drawImage(captchaImg, 0, 0);
    const rawImg = ctx.getImageData(0, 0, width, height).data;

    // preprocess
    const processedImg = cvtBinary(rawImg, 157);

    // predict
    // const inTensor = new onnx.Tensor(processedImg, "float32", [1, 1, height, width]);
    const inTensor = new Tensor("float32", processedImg, [1, 1, height, width]);
    const outputMap = await this.session.run({"input.1": inTensor});

    // output
    let result = "";
    for (const [, output] of Object.entries(outputMap)) {
        const outputList = output.data;
        const chr = Object.keys(outputList).reduce((a, b) => outputList[a] > outputList[b] ? a : b);
        if (chr !== "26") {
            result = result + String.fromCharCode('a'.charCodeAt(0) + parseInt(chr));
        }
    }

    captchaInput.value = result;
}

predict();
captchaImg.onload = predict;
