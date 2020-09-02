const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/calcular/{inicial}/{final}',
        handler: (request, h) => {

            const inicial = request.params.inicial;
            const final = request.params.final;

            const horasInicial = parseInt(inicial.substr(0,2));
            const minutosInicial = parseInt(inicial.substr(3,5));
            const horasFinal = parseInt(final.substr(0,2));
            const minutosFinal = parseInt(final.substr(3,5));


            var horasTrabalhadas = Math.abs(horasFinal - horasInicial);
            var minutosTrabalhados = Math.abs(minutosFinal - minutosInicial);

            var horasDiurnas, horasNoturnas, minutosDiurnos, minutosNoturnos;

            if(horasInicial + horasTrabalhadas > 22){
                horasDiurnas = horasTrabalhadas - ((horasInicial + horasTrabalhadas) - 22);
            }
            if(horasInicial + horasTrabalhadas > 29){
                horasDiurnas += (horasInicial + horasTrabalhadas) - 31;
            }
            horasNoturnas = horasTrabalhadas - (horasDiurnas + 2);

            if(minutosTrabalhados > 59){
                minutosNoturnos = minutosTrabalhados - 59;
                minutosDiurnos = 60 - minutosNoturnos;
            }else{
                minutosDiurnos = minutosTrabalhados;
                minutosNoturnos = 0;
            }

            return horasTrabalhadas + ":" + minutosTrabalhados + " Horas diurnas: " + horasDiurnas + ":" + minutosDiurnos + " Horas noturnas: " + horasNoturnas + ":" + minutosNoturnos;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();