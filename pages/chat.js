import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/*
fetch(`${SUPABASE_URL}/rest/v1/messages?select=*`, {
    headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey, 
        'Authorization': 'Bearer ' + supabaseAnonKey,
    }
})
    .then((res) => {
        return res.json();
    })
    .then((response) => {
        console.log(response);
    })
*/

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
        .from('mensagens-chat')
        .select('*')
        .order('id', { ascending: false})
        .then(({ data }) => {
            console.log('Dados da consulta: ', data);
            setListaDeMensagens(data);
        });
    }, []);

function handleNovaMensagem(novaMensagem) {
    const mensagem = {
        from: 'helgoeta',
        message: novaMensagem,
    };
    supabaseClient
        .from('mensagens-chat')
        .insert([
            // ! tem que ser um objeto com os mesmos campos
            mensagem
        ])
        .then(({ data }) => {
            console.log('Criando a mensagem: ', data);
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
            ]);
        });

    setMensagem('');
}

return (
    <Box
        styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat',
            backgroundColor: appConfig.theme.colors.primary[400],
            backgroundImage: `url(https://live.staticflickr.com/65535/51845424689_cf61318988_h.jpg)`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals[200],
        }}
    >
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                borderRadius: '20px',
                backgroundColor: 'rgb(238 237 233 / 75%)',
                height: '100%',
                maxWidth: '95%',
                maxHeight: '95vh',
                padding: '32px',
            }}
        >
            <Header />
            <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flex: 1,
                    height: '80%',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    flexDirection: 'column',
                    borderRadius: '20px',
                    padding: '16px',
                }}
            >
                <MessageList mensagens={listaDeMensagens}/>
                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        value={mensagem}
                        onChange={(event) => {
                            console.log(valor);
                            const valor = event.target.value;
                            setMensagem(valor);
                        }}
                        onKeyPress={(event) => {
                            if(event.key === 'Enter') {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                                console.log(event);
                            }
                        }}
                        placeholder="Insira sua mensagem aqui..."
                        type="textarea"
                        styleSheet={{
                            width: '100%',
                            border: '0',
                            resize: 'none',
                            borderRadius: '20px',
                            padding: '6px 8px',
                            backgroundColor: appConfig.theme.colors.neutrals[400],
                            marginRight: '12px',
                            color: appConfig.theme.colors.neutrals['050'],
                        }}
                    />
                </Box>
            </Box>
        </Box>
    </Box>
)
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals[200],
                marginBottom: '16px',
            }}
        >
        {props.mensagens.map((mensagem) => {
            return (
                <Text
                    key={mensagem.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '10px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals['050'],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${mensagem.from}.png`}
                        />
                        <Text tag="strong">
                            {mensagem.from}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.primary[300],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                    </Box>
                    {mensagem.message}
                </Text>
            );
        })}
    </Box>
)
}