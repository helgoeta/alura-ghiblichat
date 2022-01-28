import appConfig from '../config.json';
import React from 'react';
import { useRouter } from 'next/router';
import {Box, Button, Text, TextField, Image} from '@skynexui/components';

function Title(props) {
  return (
      <>
      <h1>{props.children}</h1>
      <style jsx>{`
      h1 {
          color: ${appConfig.theme.colors.neutrals[200]};
          font-weight: 600;
      }
      `}</style>
      </>
  );
}
  
export default function PaginaInicial() {
    const [username, setUsername] = React.useState('helgoeta');
    // troca e avisa quem precisa para trocar
    const roteamento = useRouter();
    //[use...] sao ganchos
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals[400],
            backgroundImage: 'url(https://live.staticflickr.com/65535/51845424689_cf61318988_h.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '20px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: 'rgb(238 237 233 / 75%)',
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                console.log('Alguém submeteu o form');
                roteamento.push('/chat');
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '60%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title>Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
                {appConfig.name}
              </Text>

              <TextField
                value={username}
                onChange={function (event) {
                  console.log('usuario digitou', event.target.value);
                  // Onde ta o valor?
                  const valor = event.target.value;
                  // Trocar o valor da variavel
                  setUsername(valor);
                  //o react agrupa as alteracoes e envia em lote para o navegador para renderizar, gera uma melhor otimizacao com uma resposta mais rapida
                }}
                fullWidth
                styleSheet={{
                  borderRadius: '20px'
                }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[400],
                    mainColor: appConfig.theme.colors.neutrals[700],
                    mainColorHighlight: appConfig.theme.colors.primary[700],
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                  },
                }}
              />
              <Button 
                type='submit'
                label='ENTRAR'
                fullWidth
                styleSheet={{
                  borderRadius: '20px'
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary['050'],
                  mainColorLight: appConfig.theme.colors.primary['050'],
                  mainColorStrong: appConfig.theme.colors.primary[100]
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */} 
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.primary[100],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[600],
                borderRadius: '20px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[400],
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }