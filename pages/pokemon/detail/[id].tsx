import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Typography, Grid, Button } from "@material-ui/core";
import axios from "axios";
import Header from "@components/Header";
import { typeColorGenerator } from "@helpers/typeColor";

const DetailPokemon = ({ pokemon, evolutionsResult }) => {
    const { t } = useTranslation();
    const otherImagesUrl = [];
    const statColor = [
        "#E53935",
        "#FFB74D",
        "#FFEE58",
        "#1E88E5",
        "green",
        "pink",
    ];
    const statName = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
    for (let key in pokemon.sprites) {
        if (
            pokemon.sprites[key] !== null &&
            typeof pokemon.sprites[key] === "string"
        ) {
            otherImagesUrl.push(pokemon.sprites[key]);
        }
    }

    return (
        <Container maxWidth="md">
            <Header />
            <Box component="section" gridColumnGap={40} paddingTop={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <img
                            src={
                                pokemon.sprites.other["official-artwork"]
                                    .front_default
                            }
                            style={{
                                width: "95%",
                            }}
                            alt="Pokemon Pictures"
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Typography style={{ fontSize: "60px" }}>
                            {pokemon.name[0].toUpperCase() +
                                pokemon.name.slice(1)}
                        </Typography>
                        <Grid container style={{ marginTop: "35px" }}>
                            <Grid item xs={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Weight:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>{pokemon.weight}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Height:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>{pokemon.height}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginTop: "20px" }}>
                            <Grid item xs={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Abilities:
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                {pokemon.abilities.map((el, i) => {
                                    return (
                                        <Typography key={i}>
                                            &#x2022;{" "}
                                            {el.ability.name[0].toUpperCase() +
                                                el.ability.name.slice(1)}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Typography style={{ marginTop: "20px" }}>
                            <span
                                style={{
                                    marginRight: "5px",
                                    fontWeight: "bold",
                                }}
                            >
                                Type:
                            </span>
                            {pokemon.types.map((type, i) => {
                                return (
                                    <span
                                        key={i}
                                        style={{
                                            margin: "0 5px 0 5px",
                                            padding: "5px 10px",
                                            background: typeColorGenerator(
                                                type.type.name,
                                            ),
                                            borderRadius: "15px",
                                            color: "white",
                                        }}
                                    >
                                        {type.type.name}
                                    </span>
                                );
                            })}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box component="section" gridColumnGap={40} marginTop={3}>
                <Typography style={{ fontWeight: "bold" }}>
                    Other Images:
                </Typography>
                <Grid container>
                    {otherImagesUrl.map((images, i) => {
                        return (
                            <Grid key={i} item xs={2}>
                                <img src={images} alt="Other Images" />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            <Box component="section" gridColumnGap={40} marginTop={3}>
                <Typography style={{ fontWeight: "bold" }}>Stats:</Typography>
                <Grid container>
                    {pokemon.stats.map((stat, i) => {
                        return (
                            <Grid
                                item
                                xs={2}
                                key={i}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "10px",
                                    background: statColor[i],
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    alignItems: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                }}
                            >
                                <span>{statName[i]}</span>
                                <span>{stat.base_stat}</span>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            <Box component="section" gridColumnGap={40} marginTop={3}>
                <Typography style={{ fontWeight: "bold" }}>
                    Evolution:
                </Typography>
                <Grid container>
                    {evolutionsResult.map((pokemon, i) => {
                        return (
                            <Grid key={i} item xs={2}>
                                <img
                                    src={
                                        pokemon.sprites.other[
                                            "official-artwork"
                                        ].front_default
                                    }
                                    style={{ width: "100px" }}
                                    alt="Other Images"
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

export async function getServerSideProps(context) {
    const res = await axios(
        `https://pokeapi.co/api/v2/pokemon/${context.query.id}`,
    );

    const species = await axios(
        `https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`,
    );

    const evolutions = await axios(species.data.evolution_chain);
    const evolutionsPromise = [
        axios(
            `https://pokeapi.co/api/v2/pokemon/${evolutions.data.chain.species.name}`,
        ),
        axios(
            `https://pokeapi.co/api/v2/pokemon/${evolutions.data.chain.evolves_to[0].species.name}`,
        ),
    ];

    if (evolutions.data.chain.evolves_to[0].evolves_to[0]) {
        evolutionsPromise.push(
            axios(
                `https://pokeapi.co/api/v2/pokemon/${evolutions.data.chain.evolves_to[0].evolves_to[0].species.name}`,
            ),
        );
    }

    const evolutionsResult = await Promise.all(evolutionsPromise);

    const result = evolutionsResult.map((r) => r.data);

    return {
        props: {
            pokemon: res.data,
            evolutionsResult: result,
        }, // will be passed to the page component as props
    };
}

export default DetailPokemon;
