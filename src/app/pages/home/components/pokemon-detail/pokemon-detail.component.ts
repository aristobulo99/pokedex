import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { PokemonService } from '../../../../core/services/pokemon/pokemon.service';
import { environment } from '../../../../../environments/environments';
import { Pokemon, PokemonDetail } from '../../../../core/interfaces/pokemon.interface';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { IconComponent } from '../../../../shared/components/atoms/icon/icon.component';
import { CapitalizePipe } from '../../../../shared/pipe/capitalize/capitalize.pipe';
import { DecimetersToMetersPipe } from '../../../../shared/pipe/decimetersToMeters/decimeters-to-meters.pipe';
import { HectogramsToKilogramsPipe } from '../../../../shared/pipe/hectogramsToKilograms/hectograms-to-kilograms.pipe';
import { ChipsComponent } from '../../../../shared/components/atoms/chips/chips.component';
import { Data, Datasets } from '../../../../core/interfaces/radarSkipPoints.interface';
import { RadarSkipPointsComponent } from '../../../../shared/components/organisms/radar-skip-points/radar-skip-points.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    IconComponent,
    CapitalizePipe,
    DecimetersToMetersPipe,
    HectogramsToKilogramsPipe,
    ChipsComponent,
    RadarSkipPointsComponent
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit, AfterViewInit{

  @ViewChild('pokemonDetail') pokemonDetail!: TemplateRef<any>;
  public dataPokemon!:PokemonDetail;
  public data!: number[];
  public labels!: string[];
  public dataSets!: Datasets;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private pokemonService: PokemonService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
  }

  ngAfterViewInit(): void {
    this.displayDialog();
  }

  async displayDialog() {
    const idPokemon = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.outlet === 'dialog' && idPokemon){
      await this.initializePokemonData(idPokemon);
      const dialogRef = this.dialogService.openDialog({
          width: '70.8vw',
          pokemonTypeName: this.dataPokemon.types[0].type.name,
          templete: this.pokemonDetail
      });

      dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home-pokedex']);
      });
    }
  }

  async initializePokemonData(id: string){
    const url: string = `${environment.apiUrl}/pokemon/${id}`;
    try{
      const pokemon: PokemonDetail = await this.pokemonService.getPokemonByUrl(url) as PokemonDetail;
      const pokemonSpecies = await this.pokemonService.getPokemonSpecies(pokemon.species.url);
      const evolution: Pokemon[] = await this.pokemonService.getEvolutionChain(pokemonSpecies.evolution_chain.url);
      await this.pokemonService.getTypePokemon(pokemon);
      this.dataPokemon = {...pokemon, pokemonSpecies, evolution};
      this.getDataLabesChart();
    }catch(e){
      console.log(e);
    }finally{
      this.loadingService.hide();
    }
  }

  getDataLabesChart(){
    this.data = this.dataPokemon.stats.map((stat) => stat.base_stat);
    this.labels = this.dataPokemon.stats.map((stat) => stat.stat.name);
    this.dataSets = this.pokemonService.getPokemonTypeColor(this.dataPokemon.types[0].type.name);
  }

  
}
