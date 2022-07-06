import React, { FC, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Modal,
} from "@material-ui/core";
import PokemonCard from "../../src/components/Card";
import Header from "../../src/components/Header";
import axios from "axios";
import { Pagination } from "@material-ui/lab";

const PokemonList = ({ pokemons, count }: { pokemons: any; count: number }) => {
    const { t } = useTranslation();
    const [pokemonList, setPokemonlist] = useState(pokemons);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const fetchPokemon = async () => {
            const res = await axios(
                `https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`,
            );

            const pokemonsPromise = [];
            res.data.results.forEach(async (pokemon) => {
                pokemonsPromise.push(axios(pokemon.url));
            });

            const pokemonsResult = await Promise.all(pokemonsPromise);
            const pokemons = pokemonsResult.map((pokemon) => ({
                ...pokemon.data,
            }));
            setPokemonlist(pokemons);
        };

        fetchPokemon();
    }, [offset]);

    return (
        <div>
            <Container maxWidth="md">
                <Header />
                <Box component="section" gridColumnGap={40} paddingY={11}>
                    <Grid container>
                        <Grid
                            item
                            xs={6}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "40px",
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    maxWidth: "360px",
                                }}
                            >
                                All the Pokémon data you'll ever need in one
                                place!
                            </Typography>
                            <Typography style={{ marginTop: "20px" }}>
                                Thousands of data compiled into one place
                            </Typography>
                            <Button
                                style={{
                                    backgroundColor: "#E6AB09",
                                    color: "white",
                                    textTransform: "none",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    marginTop: "30px",
                                    borderRadius: "10px",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                }}
                                variant="contained"
                                onClick={() =>
                                    window.scrollTo({
                                        top: document.getElementById("pokedex")
                                            .offsetTop,
                                        behavior: "smooth",
                                    })
                                }
                            >
                                Check PokéDex
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <img
                                src="/pokemon.png"
                                alt="pokemon"
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <section id="pokedex" style={{ background: "lightblue" }}>
                <Typography
                    style={{
                        paddingBottom: "35px",
                        paddingTop: "35px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "30px",
                    }}
                >
                    PokéDex
                </Typography>
                <Container maxWidth="md">
                    <Box>
                        <PokemonCard pokemons={pokemonList}></PokemonCard>
                    </Box>
                </Container>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "40px 0",
                    }}
                >
                    <Pagination
                        count={Math.floor(count / 12)}
                        color="primary"
                        onChange={(e, value) => setOffset((value - 1) * 12)}
                    />
                </div>
            </section>
        </div>
    );
};

export async function getServerSideProps(context) {
    const res = await axios("https://pokeapi.co/api/v2/pokemon/?limit=12");

    const pokemonsPromise = [];
    res.data.results.forEach(async (pokemon) => {
        pokemonsPromise.push(axios(pokemon.url));
    });

    const pokemonsResult = await Promise.all(pokemonsPromise);
    const pokemons = pokemonsResult.map((pokemon) => ({ ...pokemon.data }));

    return {
        props: {
            pokemons,
            count: res.data.count,
        }, // will be passed to the page component as props
    };
}

export default PokemonList;
