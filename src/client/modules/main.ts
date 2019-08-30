//
// function WASMModuleLoad(): void {
//     const imports = {
//         env: {
//             abort() {
//                 console.error('abort called');
//             },
//         },
//     };
//
//     WebAssembly.instantiateStreaming(fetch('./js/wasm.wasm'), imports).then(
//         module => {
//             const { exports } = module.instance;
//
//             // Add function here
//             const addFunc = exports.add;
//             console.log(addFunc(10, 10));
//         },
//     );
// }
//
// WASMModuleLoad();
