import React, { FC, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Modal,
    Button,
    Box,
} from "@material-ui/core";
import PokemonModal from "./Modal";
import { useRouter } from "next/router";
import { typeColorGenerator } from "@helpers/typeColor";

const PokemonCard = ({ pokemons }: { pokemons: any }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const router = useRouter();

    function formatNumber(number) {
        let str = String(number);
        while (str.length < 3) {
            str = "0" + str;
        }
        return "#" + str;
    }

    function handleOpen(pokemon) {
        setSelectedPokemon(pokemon);
        setOpen(true);
    }

    function handleClose() {
        setSelectedPokemon(null);
        setOpen(false);
    }

    return (
        <div>
            <Grid container spacing={5}>
                {pokemons.map((pokemon, key) => (
                    <Grid
                        item
                        xs={4}
                        key={key}
                        onClick={() => handleOpen(pokemon)}
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        <Card
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <img
                                src={
                                    pokemon.sprites.other["official-artwork"]
                                        .front_default
                                }
                                style={{
                                    width: "90%",
                                    margin: "0 auto",
                                }}
                                alt="Pokemon Pictures"
                            />
                            <CardContent style={{ background: "#CFD8DC" }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {pokemon.name[0].toUpperCase() +
                                        pokemon.name.slice(1)}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    style={{
                                        color: "grey",
                                    }}
                                >
                                    {formatNumber(Number(pokemon.id))}
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        maxWidth: "300px",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                    }}
                                >
                                    {pokemon.types.map((type) => {
                                        return (
                                            <div
                                                style={{
                                                    margin: "0 10px 10px 0",
                                                    padding: "5px 10px",
                                                    background:
                                                        typeColorGenerator(
                                                            type.type.name,
                                                        ),
                                                    borderRadius: "15px",
                                                    color: "white",
                                                    border: "0.1px solid #757575",
                                                }}
                                            >
                                                {type.type.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <PokemonModal
                open={open}
                selectedPokemon={selectedPokemon}
                handleClose={handleClose}
            />
        </div>
    );
};

export default PokemonCard;
